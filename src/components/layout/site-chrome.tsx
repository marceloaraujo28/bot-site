"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Locale } from "@/config/i18n.config";
import { usePathname } from "next/navigation";

type SiteChromeProps = {
  children: React.ReactNode;
  lang: Locale;
  user: {
    name?: string | null;
    image?: string | null;
  } | null;
  isBotOwner?: boolean;
};

export function SiteChrome({ children, lang, user, isBotOwner = false }: SiteChromeProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isDashboard) return <>{children}</>;

  return (
    <>
      <Navbar lang={lang} user={user} isBotOwner={isBotOwner} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
