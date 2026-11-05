import "server-only";

import { databasePool } from "@/lib/database";
import { getDashboardBillingState, type BillingPlan } from "@/lib/billing";
import { randomUUID } from "crypto";

export const ADMIN_PRODUCTS = ["EVENTS_MARKET", "KILLBOARD", "BUNDLE"] as const;
export type AdminProduct = (typeof ADMIN_PRODUCTS)[number];
export const ADMIN_MANUAL_ACTIONS = ["grant", "change", "extend", "revoke"] as const;
export type AdminManualAction = (typeof ADMIN_MANUAL_ACTIONS)[number];

const FEATURES: Record<AdminProduct, string[]> = {
  EVENTS_MARKET: ["EVENTS", "MARKET"],
  KILLBOARD: ["KILLBOARD"],
  BUNDLE: ["EVENTS", "MARKET", "KILLBOARD"],
};

export type AdminGuildFilters = {
  query?: string;
  status?: "configured" | "installed" | "absent" | "all";
  plan?: BillingPlan | "all";
  page?: number;
  pageSize?: number;
};

export type AdminGuildListItem = {
  guildId: string;
  guildName: string | null;
  language: string | null;
  configured: boolean;
  installed: boolean;
  plan: AdminProduct | null;
  subscriptionStatus: string | null;
  validUntil: Date | null;
};

function currentApplicationId() {
  return process.env.DISCORD_CLIENT_ID ?? "";
}

function pageValue(value: number | undefined, fallback: number, max: number) {
  return Math.min(Math.max(Math.floor(value ?? fallback), 1), max);
}

export async function getAdminOverview() {
  const applicationId = currentApplicationId();
  const result = await databasePool.query<{
    installed: string;
    configured: string;
    activeSubscriptions: string;
    activeTrials: string;
    expiringSoon: string;
    webhookFailures: string;
  }>(
    `SELECT
      (SELECT count(*) FROM "BotGuildInstallation" WHERE "applicationId" = $1) AS installed,
      (SELECT count(*) FROM "Guilds") AS configured,
      (SELECT count(DISTINCT "guildId") FROM "BillingSubscription" WHERE "status" = 'ACTIVE' AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > now())) AS "activeSubscriptions",
      (SELECT count(DISTINCT "guildId") FROM "BillingSubscription" WHERE "status" = 'TRIALING' AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > now())) AS "activeTrials",
      (SELECT count(DISTINCT "guildId") FROM "BillingSubscription" WHERE "status" IN ('ACTIVE','TRIALING') AND "currentPeriodEnd" > now() AND "currentPeriodEnd" <= now() + interval '7 days') AS "expiringSoon",
      (SELECT count(*) FROM "BillingWebhookEvent" WHERE "status" = 'FAILED') AS "webhookFailures"`,
    [applicationId],
  );

  const plans = await databasePool.query<{ product: AdminProduct; count: string }>(
    `SELECT "product", count(DISTINCT "guildId") AS count
     FROM "BillingSubscription"
     WHERE "status" IN ('ACTIVE','TRIALING') AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > now())
     GROUP BY "product"`,
  );

  return {
    totals: Object.fromEntries(Object.entries(result.rows[0] ?? {}).map(([key, value]) => [key, Number(value)])),
    plans: Object.fromEntries(plans.rows.map((row) => [row.product, Number(row.count)])),
  };
}

export async function getAdminRecentAuditLogs(limit = 100) {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 200);
  const result = await databasePool.query(
    `SELECT "actorDiscordUserId", "targetGuildId", action, reason, "createdAt", metadata
     FROM "AdminAuditLog"
     ORDER BY "createdAt" DESC
     LIMIT $1`,
    [safeLimit],
  );
  return result.rows;
}

export async function getAdminGuilds(filters: AdminGuildFilters = {}) {
  const page = pageValue(filters.page, 1, 10_000);
  const pageSize = pageValue(filters.pageSize, 25, 100);
  const applicationId = currentApplicationId();
  const values: unknown[] = [applicationId];
  const where: string[] = [];

  if (filters.query?.trim()) {
    values.push(`%${filters.query.trim()}%`);
    where.push(`(base."guildId" ILIKE $${values.length} OR base."guildName" ILIKE $${values.length})`);
  }
  if (filters.status && filters.status !== "all") {
    if (filters.status === "configured") where.push(`base.configured = true`);
    if (filters.status === "installed") where.push(`base.installed = true AND base.configured = false`);
    if (filters.status === "absent") where.push(`base.installed = false AND base.configured = false`);
  }
  if (filters.plan && filters.plan !== "all" && filters.plan !== "FREE") {
    values.push(filters.plan);
    where.push(`base.plan = $${values.length}`);
  }
  if (filters.plan === "FREE") where.push(`base.plan IS NULL`);
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  values.push(pageSize, (page - 1) * pageSize);

  const sql = `WITH installations AS (
      SELECT "guildId", "guildName", "installedAt", "lastSeenAt"
      FROM "BotGuildInstallation"
      WHERE "applicationId" = $1
    ), base AS (
      SELECT COALESCE(g."guildID", i."guildId") AS "guildId",
             COALESCE(g."guildName", i."guildName") AS "guildName",
             g."language" AS language,
             (g."guildID" IS NOT NULL) AS configured,
             (i."guildId" IS NOT NULL) AS installed,
             sub.product AS plan,
             sub.status AS "subscriptionStatus",
             sub."currentPeriodEnd" AS "validUntil"
      FROM "Guilds" g
      FULL OUTER JOIN installations i ON i."guildId" = g."guildID"
      LEFT JOIN LATERAL (
        SELECT product, status, "currentPeriodEnd"
        FROM "BillingSubscription"
        WHERE "guildId" = COALESCE(g."guildID", i."guildId")
          AND status IN ('ACTIVE','TRIALING')
          AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > now())
        ORDER BY "createdAt" DESC LIMIT 1
      ) sub ON true
      WHERE g."guildID" IS NOT NULL OR i."guildId" IS NOT NULL
    )
    SELECT *, count(*) OVER() AS "totalCount"
    FROM base ${whereSql}
    ORDER BY configured DESC, installed DESC, "guildName" NULLS LAST, "guildId"
    LIMIT $${values.length - 1} OFFSET $${values.length}`;
  const result = await databasePool.query<AdminGuildListItem & { totalCount: string }>(sql, values);
  const total = Number(result.rows[0]?.totalCount ?? 0);
  return {
    guilds: result.rows.map((row) => Object.fromEntries(
      Object.entries(row).filter(([key]) => key !== "totalCount"),
    ) as AdminGuildListItem),
    page,
    pageSize,
    total,
  };
}

export async function getAdminGuildDetail(guildId: string) {
  const guild = await databasePool.query(
    `WITH installations AS (
       SELECT "guildId", "guildName", "installedAt", "lastSeenAt"
       FROM "BotGuildInstallation"
       WHERE "applicationId" = $2
     )
     SELECT COALESCE(g."guildID", i."guildId") AS id, COALESCE(g."guildName", i."guildName") AS "guildName", g.language, g."newEventChannelID", g."newEventMessageID",
            i."installedAt", i."lastSeenAt"
     FROM "Guilds" g
     FULL OUTER JOIN installations i ON i."guildId" = g."guildID"
     WHERE COALESCE(g."guildID", i."guildId") = $1`,
    [guildId, currentApplicationId()],
  );
  if (!guild.rowCount) return null;

  const [billing, subscriptions, audit] = await Promise.all([
    getDashboardBillingState(guildId),
    databasePool.query(`SELECT * FROM "BillingSubscription" WHERE "guildId" = $1 ORDER BY "createdAt" DESC LIMIT 100`, [guildId]),
    databasePool.query(`SELECT * FROM "AdminAuditLog" WHERE "targetGuildId" = $1 ORDER BY "createdAt" DESC LIMIT 100`, [guildId]),
  ]);
  // Webhook events are not linked to a guild in the current schema. Returning
  // them here would incorrectly present global payment activity as this guild's
  // history. The backoffice sales screen is the only global webhook view.
  return { guild: guild.rows[0], billing, subscriptions: subscriptions.rows, webhookEvents: [], audit: audit.rows };
}

function manualSubscriptionReference(guildId: string) {
  return `manual:${guildId}:${randomUUID()}`;
}

export type ManualPlanInput = {
  action: AdminManualAction;
  product?: AdminProduct;
  durationDays?: number;
  reason: string;
};

export function parseManualPlanInput(value: unknown): ManualPlanInput | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const action = input.action;
  const reason = typeof input.reason === "string" ? input.reason.trim() : "";
  const product = input.product;
  const durationDays = typeof input.durationDays === "number" ? input.durationDays : Number(input.durationDays);
  if (!ADMIN_MANUAL_ACTIONS.includes(action as AdminManualAction) || !reason || reason.length > 500) return null;
  if (action === "revoke") return { action: action as AdminManualAction, reason };
  if (action === "extend") {
    if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 3650) return null;
    return { action: action as AdminManualAction, durationDays, reason };
  }
  if (!ADMIN_PRODUCTS.includes(product as AdminProduct) || !Number.isInteger(durationDays) || durationDays < 1 || durationDays > 3650) return null;
  return { action: action as AdminManualAction, product: product as AdminProduct, durationDays, reason };
}

type TransactionClient = { query: typeof databasePool.query };

type EntitlementSnapshot = {
  feature: string;
  source: string;
  subscriptionId: number | null;
  active: boolean;
  validUntil: Date | null;
};

type ManualSubscription = { id: number; metadata: unknown };

async function snapshotManualState(client: TransactionClient, guildId: string) {
  const [subscriptions, entitlements] = await Promise.all([
    client.query(`SELECT * FROM "BillingSubscription" WHERE "guildId" = $1 AND "provider" = 'INTERNAL' AND (metadata->>'manual') = 'true' ORDER BY "createdAt" DESC`, [guildId]),
    client.query(`SELECT * FROM "GuildEntitlement" WHERE "guildId" = $1 AND "source" = 'MANUAL' ORDER BY feature`, [guildId]),
  ]);
  return { subscriptions: subscriptions.rows, entitlements: entitlements.rows };
}

async function snapshotEntitlements(client: TransactionClient, guildId: string, features?: string[]) {
  const result = await client.query<EntitlementSnapshot>(
    features?.length
      ? `SELECT feature::text AS feature, source::text AS source, "subscriptionId", active, "validUntil"
         FROM "GuildEntitlement" WHERE "guildId" = $1 AND feature = ANY($2::"BillingFeature"[]) FOR UPDATE`
      : `SELECT feature::text AS feature, source::text AS source, "subscriptionId", active, "validUntil"
         FROM "GuildEntitlement" WHERE "guildId" = $1 FOR UPDATE`,
    features?.length ? [guildId, features] : [guildId],
  );
  return result.rows;
}

function readOverrideSnapshot(metadata: unknown): EntitlementSnapshot[] {
  if (!metadata || typeof metadata !== "object") return [];
  const value = (metadata as { overrideSnapshot?: unknown }).overrideSnapshot;
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is EntitlementSnapshot => Boolean(item) && typeof item === "object" && typeof (item as { feature?: unknown }).feature === "string");
}

async function restoreManualOverride(client: TransactionClient, guildId: string, metadata: unknown) {
  const snapshot = readOverrideSnapshot(metadata);
  // Remove only entries genuinely owned by the manual override. An external
  // provider is never deleted or expired by an admin action.
  await client.query(`DELETE FROM "GuildEntitlement" WHERE "guildId" = $1 AND source = 'MANUAL'`, [guildId]);
  for (const entitlement of snapshot) {
    await client.query(
      `INSERT INTO "GuildEntitlement" ("guildId", feature, source, "subscriptionId", active, "validUntil", "updatedAt")
       VALUES ($1, $2::"BillingFeature", $3::"BillingEntitlementSource", $4, $5, $6, now())
       ON CONFLICT ("guildId", feature) DO UPDATE SET
         source = EXCLUDED.source, "subscriptionId" = EXCLUDED."subscriptionId", active = EXCLUDED.active,
         "validUntil" = EXCLUDED."validUntil", "updatedAt" = now()`,
      [guildId, entitlement.feature, entitlement.source, entitlement.subscriptionId, entitlement.active, entitlement.validUntil],
    );
  }
}

async function activeManualSubscription(client: TransactionClient, guildId: string) {
  const result = await client.query<ManualSubscription>(
    `SELECT id, metadata FROM "BillingSubscription"
     WHERE "guildId" = $1 AND provider = 'INTERNAL' AND (metadata->>'manual') = 'true'
       AND status IN ('ACTIVE', 'TRIALING')
     ORDER BY "createdAt" DESC LIMIT 1 FOR UPDATE`,
    [guildId],
  );
  return result.rows[0] ?? null;
}

async function restoreAndExpireManualSubscription(client: TransactionClient, guildId: string, subscription: ManualSubscription, now: Date) {
  await restoreManualOverride(client, guildId, subscription.metadata);
  await client.query(
    `UPDATE "BillingSubscription"
     SET status = 'EXPIRED', "currentPeriodEnd" = $2, "updatedAt" = $2
     WHERE id = $1`,
    [subscription.id, now],
  );
}

export async function applyManualPlanChange(guildId: string, input: ManualPlanInput, actorDiscordUserId: string) {
  const client = await databasePool.connect();
  try {
    await client.query("BEGIN");
    const guild = await client.query('SELECT "guildID" FROM "Guilds" WHERE "guildID" = $1 FOR UPDATE', [guildId]);
    if (!guild.rowCount) throw new Error("Guild is not configured.");
    const before = await snapshotManualState(client, guildId);
    const now = new Date();
    let after: unknown;

    if (input.action === "revoke") {
      const manual = await activeManualSubscription(client, guildId);
      if (!manual) throw new Error("No active manual plan to revoke.");
      await restoreAndExpireManualSubscription(client, guildId, manual, now);
      after = await snapshotManualState(client, guildId);
    } else if (input.action === "extend") {
      const subscription = await client.query<{ id: number; currentPeriodEnd: Date | null }>(`SELECT id, "currentPeriodEnd" FROM "BillingSubscription" WHERE "guildId" = $1 AND "provider" = 'INTERNAL' AND (metadata->>'manual') = 'true' AND "status" = 'ACTIVE' ORDER BY "currentPeriodEnd" DESC NULLS LAST LIMIT 1 FOR UPDATE`, [guildId]);
      if (!subscription.rowCount) throw new Error("No active manual plan to extend.");
      const base = subscription.rows[0].currentPeriodEnd && subscription.rows[0].currentPeriodEnd > now ? subscription.rows[0].currentPeriodEnd : now;
      const validUntil = new Date(base.getTime() + input.durationDays! * 86_400_000);
      await client.query(`UPDATE "BillingSubscription" SET "currentPeriodEnd" = $2, "updatedAt" = $3 WHERE id = $1`, [subscription.rows[0].id, validUntil, now]);
      await client.query(`UPDATE "GuildEntitlement" SET "validUntil" = $2, "updatedAt" = $3 WHERE "subscriptionId" = $1 AND "source" = 'MANUAL'`, [subscription.rows[0].id, validUntil, now]);
      after = await snapshotManualState(client, guildId);
    } else {
      const validUntil = new Date(now.getTime() + input.durationDays! * 86_400_000);
      const existingManual = await activeManualSubscription(client, guildId);
      if (existingManual) await restoreAndExpireManualSubscription(client, guildId, existingManual, now);
      // Save the external entitlement state before this manual override takes
      // ownership of only the features supplied by the selected product.
      const overrideSnapshot = await snapshotEntitlements(client, guildId, FEATURES[input.product!]);
      const inserted = await client.query<{ id: number }>(`INSERT INTO "BillingSubscription" ("guildId", product, provider, status, "externalSubscriptionId", "currentPeriodStart", "currentPeriodEnd", "createdByDiscordUserId", metadata, "updatedAt") VALUES ($1, $2::"BillingProduct", 'INTERNAL', 'ACTIVE', $3, $4, $5, $6, $7::jsonb, $4) RETURNING id`, [guildId, input.product, manualSubscriptionReference(guildId), now, validUntil, actorDiscordUserId, JSON.stringify({ manual: true, action: input.action, reason: input.reason, overrideSnapshot })]);
      for (const feature of FEATURES[input.product!]) {
        await client.query(`INSERT INTO "GuildEntitlement" ("guildId", feature, source, "subscriptionId", active, "validUntil", "updatedAt") VALUES ($1, $2::"BillingFeature", 'MANUAL', $3, true, $4, $5) ON CONFLICT ("guildId", feature) DO UPDATE SET source = 'MANUAL', "subscriptionId" = EXCLUDED."subscriptionId", active = true, "validUntil" = EXCLUDED."validUntil", "updatedAt" = EXCLUDED."updatedAt"`, [guildId, feature, inserted.rows[0].id, validUntil, now]);
      }
      after = await snapshotManualState(client, guildId);
    }
    await client.query(`INSERT INTO "AdminAuditLog" ("actorDiscordUserId", "targetGuildId", action, reason, "beforeState", "afterState", metadata) VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::jsonb)`, [actorDiscordUserId, guildId, `manual_plan_${input.action}`, input.reason, JSON.stringify(before), JSON.stringify(after), JSON.stringify({ product: input.product, durationDays: input.durationDays })]);
    await client.query("COMMIT");
    return { billing: await getDashboardBillingState(guildId) };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
