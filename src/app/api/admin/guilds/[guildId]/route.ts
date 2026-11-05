import { requireBotOwner } from "@/lib/admin-auth";
import { getAdminGuildDetail } from "@/lib/admin-backoffice";
import { adminErrorResponse } from "@/lib/admin-route";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ guildId: string }> }) {
  try {
    await requireBotOwner();
    const { guildId } = await params;
    const detail = await getAdminGuildDetail(guildId);
    return detail ? NextResponse.json(detail, { headers: { "Cache-Control": "no-store" } }) : NextResponse.json({ error: "not_found" }, { status: 404 });
  } catch (error) { return adminErrorResponse(error); }
}
