import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import { use } from "react";

export default function FinishedEvent({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsFinishEvent.title}</h1>

      <p>
        {t.docsFinishEvent.descriptionInitial}{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">Albion Event Manager</code>{" "}
        {t.docsFinishEvent.descriptionFinal}
      </p>

      <p>{t.docsFinishEvent.finishText}</p>

      <Image src="/finish-event.png" alt="Participar do Evento" quality={100} width={230} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          {t.docsFinishEvent.warning.text1} <strong>Albion Event Bot Manager</strong>{" "}
          {t.docsFinishEvent.warning.text1Final}
        </p>
        <p>
          {t.docsFinishEvent.warning.text2} <strong>{t.docsFinishEvent.warning.text2Strong}</strong>.
        </p>
        <p>
          {t.docsFinishEvent.warning.text3} <strong>{t.docsFinishEvent.warning.text3Strong}</strong>.
        </p>
        <p>
          {t.docsFinishEvent.warning.text4} <strong>{t.docsFinishEvent.warning.text4Strong}</strong>{" "}
          {t.docsFinishEvent.warning.text4Final}
        </p>
      </div>

      <p>{t.docsFinishEvent.finishDescription}</p>
    </section>
  );
}
