import { auth } from "@/auth";
import { getConfiguredGuildIds } from "@/lib/configured-guilds";
import {
  DiscordGuildFetchError,
  getCachedManagedDiscordGuilds,
  getManagedDiscordGuilds,
  ManagedDiscordGuild,
} from "@/lib/discord-guilds";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { cache } from "react";
import { getBotInstallUrl } from "@/lib/bot-install";
import { getBotInstalledGuildIds } from "@/lib/bot-installed-guilds";

export type DashboardGuild = ManagedDiscordGuild & {
  botConfigured: boolean;
  botInstalled: boolean;
  installUrl: string | null;
};

export class DashboardAuthenticationError extends Error {}
export class DashboardReauthenticationError extends Error {}

function hasExpiredAccessToken(expiresAt: unknown) {
  return typeof expiresAt === "number" && expiresAt <= Date.now();
}

export async function getDashboardGuilds(request: NextRequest): Promise<DashboardGuild[]> {
  const session = await auth();

  if (!session?.user) throw new DashboardAuthenticationError();

  const discordUserId = session.user.id;
  if (typeof discordUserId !== "string" || !discordUserId) {
    throw new DashboardAuthenticationError();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const accessToken = token?.discordAccessToken;

  if (typeof accessToken !== "string" || hasExpiredAccessToken(token?.discordAccessTokenExpiresAt)) {
    throw new DashboardReauthenticationError();
  }

  const managedDiscordGuilds = await getCachedManagedDiscordGuilds(discordUserId, accessToken);
  const configuredGuildIds = await getConfiguredGuildIds(managedDiscordGuilds.map((guild) => guild.id));
  const installedGuildIds = await getBotInstalledGuildIds(managedDiscordGuilds.map((guild) => guild.id));

  return managedDiscordGuilds.map((guild) => {
    const botConfigured = configuredGuildIds.has(guild.id);
    const botInstalled = installedGuildIds.has(guild.id);

    return {
      ...guild,
      botConfigured,
      botInstalled,
      installUrl: botConfigured || botInstalled ? null : getBotInstallUrl(guild.id),
    };
  });
}

/**
 * Performs a fresh Discord permission check for a state-changing dashboard
 * action. Display routes can use the five-minute guild cache; activating a
 * trial must never authorize from that cache alone.
 */
export async function getLiveAuthorizedConfiguredGuild(request: NextRequest, guildId: string) {
  const session = await auth();

  if (!session?.user) throw new DashboardAuthenticationError();

  const discordUserId = session.user.id;
  if (typeof discordUserId !== "string" || !discordUserId) {
    throw new DashboardAuthenticationError();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const accessToken = token?.discordAccessToken;

  if (typeof accessToken !== "string" || hasExpiredAccessToken(token?.discordAccessTokenExpiresAt)) {
    throw new DashboardReauthenticationError();
  }

  const guilds = await getManagedDiscordGuilds(accessToken);
  const guild = guilds.find((candidate) => candidate.id === guildId);
  if (!guild) return null;

  const configuredGuildIds = await getConfiguredGuildIds([guildId]);
  if (!configuredGuildIds.has(guildId)) return null;

  return { guild, discordUserId };
}

/**
 * Server Components do not receive a NextRequest directly. This builds a
 * minimal request from the current request headers so Auth.js can decode its
 * protected cookie exclusively on the server.
 */
export const getDashboardGuildsForServerComponent = cache(async (): Promise<DashboardGuild[]> => {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  const request = new NextRequest(`${protocol}://${host}/dashboard-server-data`, {
    headers: requestHeaders,
  });

  return getDashboardGuilds(request);
});

export { DiscordGuildFetchError };
