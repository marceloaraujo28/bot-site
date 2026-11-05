import { requireBotOwner } from "@/lib/admin-auth";
import { applyManualPlanChange, parseManualPlanInput } from "@/lib/admin-backoffice";
import { adminErrorResponse, hasSameOrigin } from "@/lib/admin-route";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  try {
    if (!hasSameOrigin(request)) return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
    const { discordUserId } = await requireBotOwner();
    const input = parseManualPlanInput(await request.json().catch(() => null));
    if (!input) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    const { guildId } = await params;
    return NextResponse.json(await applyManualPlanChange(guildId, input, discordUserId), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return adminErrorResponse(error); }
}
