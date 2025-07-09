import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDictionaryServer(lang);

  return (
    <footer className="bg-[#221f41] text-white py-12 box-shadow-lg">
      <div className="max-w-[1590px] mx-auto px-6">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-16 space-y-8 md:space-y-0">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/alpaca.png"
                alt="Albion Event Bot"
                width={80}
                height={80}
                className="rounded-2xl opacity-90 shadow-lg hover:opacity-100 transition-opacity duration-300"
              />
              <p className="text-gray-300 text-sm text-center max-w-xs">{t.footer.thanksMessage}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="mb-5 text-[20px] text-blue-600">Quick links</h1>
              <nav aria-label="Footer navigation" className="flex flex-col items-center space-y-4">
                <Link
                  href="/"
                  className="text-gray-300 text-base font-medium hover:text-gray-400 transition-colors duration-300"
                >
                  {t.navBar.home}
                </Link>

                <Link
                  href="/docs"
                  className="text-gray-300 text-base font-medium hover:text-gray-400 transition-colors duration-300"
                >
                  {t.navBar.docs}
                </Link>

                <Link
                  href="https://discord.gg/AjGZbc5b2s"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image alt="Discord Logo" src="/discord.png" width={20} height={20} className="inline-block mr-2" />
                  <span>{t.navBar.support}</span>
                </Link>

                <Link
                  href="/contribution"
                  className="text-green-400 text-base font-medium hover:text-green-300 transition-colors duration-300"
                >
                  {t.navBar.contribution}
                </Link>
              </nav>
            </div>
          </div>

          <div className="w-full h-px bg-gray-600"></div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-300">{t.footer.rights}</p>
            <p className="text-sm text-gray-400">{t.footer.madeWithLove}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
