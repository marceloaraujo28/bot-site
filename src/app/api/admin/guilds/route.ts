import { requireBotOwner } from "@/lib/admin-auth";
import { getAdminGuilds } from "@/lib/admin-backoffice";
import { adminErrorResponse } from "@/lib/admin-route";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireBotOwner();
    const search = request.nextUrl.searchParams;
    const page = Number(search.get("page") ?? "1");
    const pageSize = Number(search.get("pageSize") ?? "25");
    const status = search.get("status") as "configured" | "installed" | "absent" | "all" | null;
    const plan = search.get("plan") as "FREE" | "EVENTS_MARKET" | "KILLBOARD" | "BUNDLE" | "all" | null;
    return NextResponse.json(await getAdminGuilds({ query: search.get("q") ?? undefined, status: status ?? undefined, plan: plan ?? undefined, page, pageSize }), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return adminErrorResponse(error); }
}
