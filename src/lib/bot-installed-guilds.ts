import { databasePool } from "./database";

export async function getBotInstalledGuildIds(discordGuildIds: string[]) {
  const applicationId = process.env.DISCORD_CLIENT_ID;
  if (!applicationId || discordGuildIds.length === 0) return new Set<string>();

  const result = await databasePool.query<{ guildId: string }>(
    'SELECT "guildId" FROM "BotGuildInstallation" WHERE "applicationId" = $1 AND "guildId" = ANY($2::text[])',
    [applicationId, discordGuildIds]
  );

  return new Set(result.rows.map((guild) => guild.guildId));
}
