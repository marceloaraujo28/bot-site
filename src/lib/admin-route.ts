import "server-only";

import { AdminAuthenticationError, AdminAuthorizationError } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export function adminErrorResponse(error: unknown) {
  if (error instanceof AdminAuthenticationError) return NextResponse.json({ error: "authentication_required" }, { status: 401 });
  if (error instanceof AdminAuthorizationError) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  console.error("Admin backoffice request failed.");
  return NextResponse.json({ error: "admin_unavailable" }, { status: 500 });
}

/** Blocks cross-site form/API posts. Auth still authorizes every request. */
export function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.protocol === requestUrl.protocol && originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}
