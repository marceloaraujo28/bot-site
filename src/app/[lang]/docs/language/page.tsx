import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import { use } from "react";

export default function Language({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsLanguage.title}</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{t.docsLanguage.subTitle}</h2>
          <p>
            {t.docsLanguage.descriptionInitial}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">/lang</code>
            {t.docsLanguage.descriptionFinal}
          </p>
          <p>
            <strong>{t.docsLanguage.requirementsStrong}</strong> {t.docsLanguage.requirementsText}{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">Administrador</code>{" "}
            {t.docsLanguage.requirementsTextFinal}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{t.docsLanguage.userLanguageTitle}</h2>
          <p>
            {t.docsLanguage.userLanguageDescriptionInitial}{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">/price-lang</code>
            {t.docsLanguage.userLanguageDescriptionFinal}
          </p>
          <p>
            <strong>{t.docsLanguage.userLanguageRequirementsStrong}</strong>{" "}
            {t.docsLanguage.userLanguageRequirementsText}
          </p>
        </div>
      </div>
    </section>
  );
}
