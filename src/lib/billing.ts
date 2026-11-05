import { databasePool } from "@/lib/database";

export type BillingPlan = "FREE" | "EVENTS_MARKET" | "KILLBOARD" | "BUNDLE";
export type BillingFeature = "EVENTS" | "MARKET" | "KILLBOARD";
export type BillingUsageMetric = "EVENTS_STARTED" | "MARKET_QUERY" | "KILLBOARD_NOTIFICATION";

export type DashboardBillingState = {
  plan: BillingPlan;
  isTrial: boolean;
  validUntil: string | null;
  features: BillingFeature[];
  trialUsed: boolean;
  usage: Record<BillingUsageMetric, number>;
};

const ACTIVE_STATUSES = ["ACTIVE", "TRIALING"] as const;
const FEATURES_BY_PRODUCT: Record<Exclude<BillingPlan, "FREE">, BillingFeature[]> = {
  EVENTS_MARKET: ["EVENTS", "MARKET"],
  KILLBOARD: ["KILLBOARD"],
  BUNDLE: ["EVENTS", "MARKET", "KILLBOARD"],
};

function utcDayStart(now = new Date()) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function planFromProducts(products: BillingPlan[]): BillingPlan {
  if (products.includes("BUNDLE")) return "BUNDLE";
  return products[0] ?? "FREE";
}

export async function getDashboardBillingState(guildId: string, now = new Date()): Promise<DashboardBillingState> {
  const periodStartedAt = utcDayStart(now);
  const utcDay = periodStartedAt.toISOString().slice(0, 10);
  const [subscriptionsResult, entitlementsResult, usageResult, trialResult] = await Promise.all([
    databasePool.query<{
      product: BillingPlan;
      status: "ACTIVE" | "TRIALING";
      currentPeriodEnd: Date | null;
    }>(
      `SELECT "product", "status", "currentPeriodEnd"
       FROM "BillingSubscription"
       WHERE "guildId" = $1
         AND "status" = ANY($2::"BillingSubscriptionStatus"[])
         AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > $3)
       ORDER BY "createdAt" DESC`,
      [guildId, ACTIVE_STATUSES, now],
    ),
    databasePool.query<{
      feature: BillingFeature;
      validUntil: Date | null;
    }>(
      `SELECT entitlement."feature", entitlement."validUntil"
       FROM "GuildEntitlement" entitlement
       LEFT JOIN "BillingSubscription" subscription ON subscription."id" = entitlement."subscriptionId"
       WHERE entitlement."guildId" = $1
         AND entitlement."active" = true
         AND (entitlement."validUntil" IS NULL OR entitlement."validUntil" > $2)
         AND (
           entitlement."source" = 'MANUAL'
           OR (
             subscription."status" = ANY($3::"BillingSubscriptionStatus"[])
             AND (subscription."currentPeriodEnd" IS NULL OR subscription."currentPeriodEnd" > $2)
           )
         )`,
      [guildId, now, ACTIVE_STATUSES],
    ),
    databasePool.query<{ metric: BillingUsageMetric; count: number }>(
      `SELECT "metric", "count"
       FROM "BillingUsageCounter"
       WHERE "guildId" = $1
         AND "periodStartedAt" >= $2::date
         AND "periodStartedAt" < ($2::date + INTERVAL '1 day')`,
      [guildId, utcDay],
    ),
    databasePool.query<{ used: boolean }>(
      `SELECT EXISTS(
        SELECT 1 FROM "BillingSubscription"
        WHERE "provider" = 'INTERNAL'
          AND "externalSubscriptionId" = $1
      ) AS "used"`,
      [`trial:${guildId}`],
    ),
  ]);

  const features = new Set<BillingFeature>();
  for (const subscription of subscriptionsResult.rows) {
    if (subscription.product !== "FREE") {
      for (const feature of FEATURES_BY_PRODUCT[subscription.product]) features.add(feature);
    }
  }
  for (const entitlement of entitlementsResult.rows) features.add(entitlement.feature);

  const usage: Record<BillingUsageMetric, number> = {
    EVENTS_STARTED: 0,
    MARKET_QUERY: 0,
    KILLBOARD_NOTIFICATION: 0,
  };
  for (const row of usageResult.rows) usage[row.metric] = Number(row.count);

  const subscriptions = subscriptionsResult.rows;
  const validUntil = subscriptions
    .map((subscription) => subscription.currentPeriodEnd)
    .filter((value): value is Date => value !== null)
    .sort((left, right) => right.getTime() - left.getTime())[0] ?? null;

  const state: DashboardBillingState = {
    plan: planFromProducts(subscriptions.map((subscription) => subscription.product)),
    isTrial: subscriptions.some((subscription) => subscription.status === "TRIALING"),
    validUntil: validUntil?.toISOString() ?? null,
    features: [...features],
    trialUsed: Boolean(trialResult.rows[0]?.used),
    usage,
  };

  return state;
}

export type TrialActivationResult =
  | { activated: true; state: DashboardBillingState }
  | { activated: false; reason: "already_used" | "paid_subscription"; state: DashboardBillingState };

export async function activateDashboardTrial(guildId: string, discordUserId: string): Promise<TrialActivationResult> {
  const now = new Date();
  const currentPeriodEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const externalSubscriptionId = `trial:${guildId}`;
  const client = await databasePool.connect();

  try {
    await client.query("BEGIN");

    const guild = await client.query<{ guildID: string }>('SELECT "guildID" FROM "Guilds" WHERE "guildID" = $1 FOR KEY SHARE', [guildId]);
    if (!guild.rowCount) throw new Error("Guild is not configured.");

    const existingTrial = await client.query<{ id: number }>(
      `SELECT "id" FROM "BillingSubscription"
       WHERE "provider" = 'INTERNAL' AND "externalSubscriptionId" = $1`,
      [externalSubscriptionId],
    );
    if (existingTrial.rowCount) {
      await client.query("COMMIT");
      return { activated: false, reason: "already_used", state: await getDashboardBillingState(guildId) };
    }

    const paidSubscription = await client.query<{ id: number }>(
      `SELECT "id" FROM "BillingSubscription"
       WHERE "guildId" = $1
         AND "provider" = ANY($2::"BillingProvider"[])
         AND "status" = 'ACTIVE'
         AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > $3)
       LIMIT 1`,
      [guildId, ["STRIPE", "ASAAS"], now],
    );
    if (paidSubscription.rowCount) {
      await client.query("COMMIT");
      return { activated: false, reason: "paid_subscription", state: await getDashboardBillingState(guildId) };
    }

    let subscriptionId: number;
    try {
      const created = await client.query<{ id: number }>(
        `INSERT INTO "BillingSubscription" (
          "guildId", "product", "provider", "status", "externalSubscriptionId",
          "currentPeriodStart", "currentPeriodEnd", "createdByDiscordUserId", "metadata", "updatedAt"
        ) VALUES ($1, 'BUNDLE', 'INTERNAL', 'TRIALING', $2, $3, $4, $5, $6::jsonb, $3)
        RETURNING "id"`,
        [guildId, externalSubscriptionId, now, currentPeriodEnd, discordUserId, JSON.stringify({ trial: true, durationDays: 7 })],
      );
      subscriptionId = created.rows[0].id;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
        await client.query("ROLLBACK");
        return { activated: false, reason: "already_used", state: await getDashboardBillingState(guildId) };
      }
      throw error;
    }

    for (const feature of FEATURES_BY_PRODUCT.BUNDLE) {
      await client.query(
        `INSERT INTO "GuildEntitlement" (
          "guildId", "feature", "source", "subscriptionId", "active", "validUntil", "updatedAt"
        ) VALUES ($1, $2::"BillingFeature", 'TRIAL', $3, true, $4, $5)
        ON CONFLICT ("guildId", "feature") DO UPDATE SET
          "source" = 'TRIAL',
          "subscriptionId" = EXCLUDED."subscriptionId",
          "active" = true,
          "validUntil" = EXCLUDED."validUntil",
          "updatedAt" = EXCLUDED."updatedAt"`,
        [guildId, feature, subscriptionId, currentPeriodEnd, now],
      );
    }

    await client.query("COMMIT");
    return { activated: true, state: await getDashboardBillingState(guildId) };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
