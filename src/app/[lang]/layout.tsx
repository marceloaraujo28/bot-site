import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { i18n, Locale } from "@/config/i18n.config";

const interSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Albion Event Bot",
  description: "Bot para Split Loot e Consultar preços do mercado em Albion Online",
};

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
