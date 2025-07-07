import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDictionaryServer(lang);

  return (
    <footer className="bg-[#221f41] text-white py-8  box-shadow-lg">
      <div className="max-w-[1590px] mx-auto px-6">
        <div className="text-center">
          <p className="text-sm mb-2">{t.footer.rights}</p>
          <p className="text-sm">{t.footer.madeWithLove}</p>
        </div>
      </div>
    </footer>
  );
}
