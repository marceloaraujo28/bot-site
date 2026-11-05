import { LOCALE_COOKIE, Locale, isLocale } from "@/config/i18n.config";
import { NextRequest, NextResponse } from "next/server";

const LEGACY_LOCALE_PATTERN = /^\/(pt-BR|en-US)(?=\/|$)/;

function localeFromAcceptLanguage(header: string | null): Locale {
  const preferences = (header ?? "")
    .split(",")
    .map((entry, index) => {
      const [language = "", ...parameters] = entry.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number.parseFloat(qualityParameter.trim().slice(2)) : 1;

      return {
        language,
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter(({ language, quality }) => language && quality > 0)
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  for (const { language } of preferences) {
    if (language === "pt" || language.startsWith("pt-")) return "pt-BR";
    if (language === "en" || language.startsWith("en-")) return "en-US";
  }

  return "en-US";
}

function preferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  return isLocale(cookieLocale) ? cookieLocale : localeFromAcceptLanguage(request.headers.get("accept-language"));
}

function persistLocale(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export default function middleware(request: NextRequest) {
  const legacyMatch = request.nextUrl.pathname.match(LEGACY_LOCALE_PATTERN);

  if (legacyMatch) {
    const locale = legacyMatch[1] as Locale;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = request.nextUrl.pathname.replace(LEGACY_LOCALE_PATTERN, "") || "/";

    const response = NextResponse.redirect(redirectUrl);
    persistLocale(response, locale);
    return response;
  }

  const locale = preferredLocale(request);
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
