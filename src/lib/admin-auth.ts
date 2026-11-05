import "server-only";

import { auth } from "@/auth";

const DISCORD_USER_ID_PATTERN = /^\d{17,20}$/;

export class AdminAuthenticationError extends Error {
  constructor() {
    super("An authenticated Discord session is required.");
    this.name = "AdminAuthenticationError";
  }
}

export class AdminAuthorizationError extends Error {
  constructor() {
    super("This Discord account is not authorized to access the backoffice.");
    this.name = "AdminAuthorizationError";
  }
}

/**
 * Parses the owner allowlist exclusively on the server. An absent or invalid
 * setting deliberately produces an empty set: the backoffice must never be
 * accessible by default.
 */
function getBotOwnerDiscordIds() {
  const configuredIds = process.env.BOT_OWNER_DISCORD_IDS;

  if (!configuredIds) return new Set<string>();

  return new Set(
    configuredIds
      .split(",")
      .map((id) => id.trim())
      .filter((id) => DISCORD_USER_ID_PATTERN.test(id)),
  );
}

export function isBotOwnerDiscordId(discordUserId: string | null | undefined) {
  if (!discordUserId || !DISCORD_USER_ID_PATTERN.test(discordUserId)) return false;

  return getBotOwnerDiscordIds().has(discordUserId);
}

/**
 * Safe for Server Components that only need a boolean to decide whether to
 * render an Admin link. It never exposes the configured allowlist.
 */
export async function isCurrentUserBotOwner() {
  const session = await auth();
  const discordUserId = session?.user?.id;
  return isBotOwnerDiscordId(discordUserId);
}

/**
 * Required by every owner-only page, route handler and server action.
 * Authorization is checked on the server for each call; hiding a UI link is
 * intentionally not considered authorization.
 */
export async function requireBotOwner() {
  const session = await auth();
  const discordUserId = session?.user?.id;

  if (!discordUserId) throw new AdminAuthenticationError();
  if (!isBotOwnerDiscordId(discordUserId)) throw new AdminAuthorizationError();

  return { session, discordUserId };
}
