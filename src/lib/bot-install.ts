const DISCORD_INSTALL_SCOPES = "bot applications.commands";
const DISCORD_ADMINISTRATOR_PERMISSION = "8";

export function getBotInstallUrl(guildId?: string) {
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!clientId) return null;

  const query = new URLSearchParams({
    client_id: clientId,
    scope: DISCORD_INSTALL_SCOPES,
    permissions: DISCORD_ADMINISTRATOR_PERMISSION,
  });

  if (guildId) {
    query.set("guild_id", guildId);
    query.set("disable_guild_select", "true");
  }

  return `https://discord.com/oauth2/authorize?${query.toString()}`;
}
