import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { i18n, Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Script from "next/script";

const interSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;

  const t = getDictionaryServer(lang);

  return {
    title: t.SEO.home.title,
    description: t.SEO.home.description,
    icons: {
      icon: "/faviconIco.ico",
    },
    keywords: t.SEO.home.keywords,
    applicationName: "Albion Event Bot",
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
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
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
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
