import { databasePool } from "./database";

export async function getConfiguredGuildIds(discordGuildIds: string[]) {
  if (discordGuildIds.length === 0) return new Set<string>();

  const result = await databasePool.query<{ guildID: string }>(
    'SELECT "guildID" FROM "Guilds" WHERE "guildID" = ANY($1::text[])',
    [discordGuildIds]
  );

  return new Set(result.rows.map((guild) => guild.guildID));
}
