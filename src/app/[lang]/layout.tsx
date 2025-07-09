import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { i18n, Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";

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
      <body className={`${interSans.variable} antialiased`}>
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
