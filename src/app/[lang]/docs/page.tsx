import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import { use } from "react";

export default function Documentation({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsInstalation.title}</h1>

      <p>{t.docsInstalation.description}</p>

      <ol className="list-decimal list-inside space-y-2 text-gray-300">
        <li>
          <span>{t.docsInstalation.steps.step1} </span>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1272188978765893714&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {t.docsInstalation.steps.step1Link}
          </a>
        </li>
        <li>{t.docsInstalation.steps.step2}</li>
        <li>{t.docsInstalation.steps.step3}</li>
        <li>
          {t.docsInstalation.steps.step4Initial} <strong>{t.docsInstalation.steps.step4Strong}</strong>.
        </li>
      </ol>

      <div className="p-4 bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
        <p className="text-yellow-300 font-semibold">⚠️ Atenção:</p>
        <p>
          {t.docsInstalation.warning.textInital} <strong>{t.docsInstalation.warning.textStrong}</strong>{" "}
          {t.docsInstalation.warning.textFinal}
        </p>
      </div>
    </section>
  );
}
