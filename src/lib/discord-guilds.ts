import { unstable_cache } from "next/cache";

const DISCORD_API_BASE_URL = "https://discord.com/api/v10";
const ADMINISTRATOR_PERMISSION = BigInt(8);
const MAX_RATE_LIMIT_RETRY_DELAY_MS = 1000;
const DEFAULT_RATE_LIMIT_RETRY_DELAY_MS = 250;
const MANAGED_GUILDS_CACHE_REVALIDATE_SECONDS = 60 * 5;

type DiscordGuildResponse = {
  id: string;
  name: string;
  icon: string | null;
  owner?: boolean;
  permissions?: string;
  permissions_new?: string;
};

export type ManagedDiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  isOwner: boolean;
};

function hasAdministratorPermission(guild: DiscordGuildResponse) {
  const permissions = guild.permissions_new ?? guild.permissions;

  if (!permissions) return false;

  try {
    return (BigInt(permissions) & ADMINISTRATOR_PERMISSION) === ADMINISTRATOR_PERMISSION;
  } catch {
    return false;
  }
}

export class DiscordGuildFetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly rateLimited = false,
  ) {
    super("Discord guild lookup failed.");
  }
}

function getRateLimitDelay(response: Response) {
  const retryAfterSeconds = Number.parseFloat(response.headers.get("retry-after") ?? "");

  if (!Number.isFinite(retryAfterSeconds) || retryAfterSeconds <= 0) {
    return DEFAULT_RATE_LIMIT_RETRY_DELAY_MS;
  }

  return Math.min(Math.ceil(retryAfterSeconds * 1000), MAX_RATE_LIMIT_RETRY_DELAY_MS);
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchDiscordGuilds(accessToken: string) {
  return fetch(`${DISCORD_API_BASE_URL}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

export async function getManagedDiscordGuilds(accessToken: string) {
  let response = await fetchDiscordGuilds(accessToken);

  if (response.status === 429) {
    await wait(getRateLimitDelay(response));
    response = await fetchDiscordGuilds(accessToken);
  }

  if (!response.ok) {
    const rateLimited = response.status === 429;
    console.warn(`Discord guild lookup failed with HTTP ${response.status}${rateLimited ? " after one retry" : ""}.`);
    throw new DiscordGuildFetchError(response.status, rateLimited);
  }

  const guilds = (await response.json()) as DiscordGuildResponse[];

  return guilds
    .filter((guild) => guild.owner || hasAdministratorPermission(guild))
    .map<ManagedDiscordGuild>((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      isOwner: Boolean(guild.owner),
    }));
}

/**
 * Caches only the sanitized guild list, never the OAuth access token. The
 * cache key is scoped to the Discord user, so one user's memberships cannot
 * be returned to another user. The access token remains a request-local
 * closure and is used only when a cache miss needs a fresh Discord request.
 */
export async function getCachedManagedDiscordGuilds(discordUserId: string, accessToken: string) {
  const getCachedGuilds = unstable_cache(
    async () => getManagedDiscordGuilds(accessToken),
    ["managed-discord-guilds", discordUserId],
    {
      revalidate: MANAGED_GUILDS_CACHE_REVALIDATE_SECONDS,
      tags: [`managed-discord-guilds:${discordUserId}`],
    },
  );

  return getCachedGuilds();
}
