import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SiteChrome } from "@/components/layout/site-chrome";
import { isCurrentUserBotOwner } from "@/lib/admin-auth";
import { i18n } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Script from "next/script";

const interSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const language = lang === "pt-BR" ? "pt-BR" : "en-US";

  const t = getDictionaryServer(language);

  return {
    title: "Albion Event Bot - Loot Split & Market Price",
    description: t.SEO.home.description,
    icons: {
      icon: "/faviconIco.ico",
    },
    keywords: t.SEO.home.keywords,
    applicationName: "Albion Event Bot",
    openGraph: {
      title: t.SEO.home.title,
      description: t.SEO.home.description,
      siteName: "Albion Event Bot",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({
    lang,
  }));
  return languages;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const language = lang === "pt-BR" ? "pt-BR" : "en-US";
  const session = await auth();
  const isBotOwner = await isCurrentUserBotOwner();
  return (
    <html lang={language}>
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3T5G08VC56" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3T5G08VC56');
          `}
        </Script>
      </head>

      <body className={`${interSans.variable} antialiased`}>
        <SiteChrome lang={language} user={session?.user ?? null} isBotOwner={isBotOwner}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
