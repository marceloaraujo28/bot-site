import { LOCALE_COOKIE, isLocale } from "@/config/i18n.config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const locale = typeof body === "object" && body !== null && "locale" in body
    ? body.locale
    : undefined;

  if (typeof locale !== "string" || !isLocale(locale)) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
