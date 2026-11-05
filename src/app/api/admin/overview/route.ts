import { requireBotOwner } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin-backoffice";
import { adminErrorResponse } from "@/lib/admin-route";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireBotOwner();
    return NextResponse.json(await getAdminOverview(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return adminErrorResponse(error); }
}
