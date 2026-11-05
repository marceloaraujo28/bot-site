export const LOCALE_COOKIE = "aeb_locale";

const defaultLocale = "en-US";
const langs = ["pt-BR", defaultLocale] as const;

const locales = langs as unknown as string[];

export const i18n = {
  defaultLocale,
  locales,
  localeDetection: true,
};

export type Locale = (typeof langs)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "pt-BR" || value === "en-US";
}
