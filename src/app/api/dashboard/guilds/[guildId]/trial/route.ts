import { activateDashboardTrial } from "@/lib/billing";
import {
  DashboardAuthenticationError,
  DashboardReauthenticationError,
  DiscordGuildFetchError,
  getLiveAuthorizedConfiguredGuild,
} from "@/lib/dashboard-guilds";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ guildId: string }> },
) {
  const { guildId } = await params;

  try {
    const authorizedGuild = await getLiveAuthorizedConfiguredGuild(request, guildId);
    if (!authorizedGuild) {
      return NextResponse.json({ error: "guild_not_authorized" }, { status: 403 });
    }

    const result = await activateDashboardTrial(guildId, authorizedGuild.discordUserId);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof DashboardAuthenticationError || error instanceof DashboardReauthenticationError) {
      return NextResponse.json({ error: "reauthentication_required" }, { status: 401 });
    }

    if (error instanceof DiscordGuildFetchError) {
      return NextResponse.json(
        { error: error.rateLimited ? "discord_rate_limited" : "discord_unavailable" },
        { status: error.rateLimited ? 503 : 502, headers: error.rateLimited ? { "Retry-After": "1" } : undefined },
      );
    }

    console.error("Trial activation failed.");
    return NextResponse.json({ error: "trial_activation_failed" }, { status: 500 });
  }
}
