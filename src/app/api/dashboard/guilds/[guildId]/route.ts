import {
  DashboardAuthenticationError,
  DashboardReauthenticationError,
  DiscordGuildFetchError,
  getDashboardGuilds,
} from "@/lib/dashboard-guilds";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;

  try {
    const guild = (await getDashboardGuilds(request)).find((candidate) => candidate.id === guildId && candidate.botConfigured);

    if (!guild) return NextResponse.json({ error: "not_found" }, { status: 404 });

    return NextResponse.json({ guild }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof DashboardAuthenticationError || error instanceof DashboardReauthenticationError) {
      return NextResponse.json({ error: "reauthentication_required" }, { status: 401 });
    }

    if (error instanceof DiscordGuildFetchError) {
      if (error.rateLimited) {
        return NextResponse.json(
          { error: "discord_rate_limited" },
          { status: 503, headers: { "Retry-After": "1" } },
        );
      }

      return NextResponse.json({ error: "discord_unavailable" }, { status: 502 });
    }

    console.error("Dashboard guild detail lookup failed.");
    return NextResponse.json({ error: "dashboard_unavailable" }, { status: 503 });
  }
}
