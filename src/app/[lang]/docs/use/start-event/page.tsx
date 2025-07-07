import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import { use } from "react";

export default function ComecarEvento({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsStartEvent.title}</h1>

      <p>
        {t.docsStartEvent.descriptionInitial}{" "}
        <strong className="text-white">{t.docsStartEvent.descriptionStrong}</strong>
        {t.docsStartEvent.descriptionFinal}
      </p>

      <p>
        {t.docsStartEvent.startText} <strong className="text-white">{t.docsStartEvent.startTextStrong}</strong>{" "}
        {t.docsStartEvent.startTextFinal}{" "}
        <strong className="text-white">{t.docsStartEvent.startTextFinalStrong}</strong>.
      </p>

      <Image src="/start-event.png" alt={t.docsStartEvent.startImageAlt} quality={100} width={272} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          {t.docsStartEvent.warning.text1} <strong>Albion Event Bot Manager</strong>{" "}
          {t.docsStartEvent.warning.text1Final}
        </p>
        <p>{t.docsStartEvent.warning.text2}</p>
      </div>

      <p>{t.docsStartEvent.startFinalDescription}</p>
    </section>
  );
}
