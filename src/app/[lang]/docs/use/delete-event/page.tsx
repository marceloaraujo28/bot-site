import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import { use } from "react";

export default function DeleteEvent({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsCancelEvent.title}</h1>

      <p>
        {t.docsCancelEvent.descriptionInitial}{" "}
        <strong className="text-white">{t.docsCancelEvent.descriptionStrong}</strong>{" "}
        {t.docsCancelEvent.descriptionFinal}
      </p>

      <p>
        {t.docsCancelEvent.cancelDescriptionInitial} <strong className="text-white">🛑</strong>{" "}
        {t.docsCancelEvent.cancelDescriptionFinal}
      </p>

      <Image src="/delete-event.png" alt={t.docsCancelEvent.cancelImageAlt} quality={100} width={272} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          {t.docsCancelEvent.warning.text1inital} <strong>{t.docsCancelEvent.warning.text1Strong}</strong>{" "}
          {t.docsCancelEvent.warning.text1Final}
        </p>
        <p>
          {t.docsCancelEvent.warning.text2} <strong>{t.docsCancelEvent.warning.text2Strong}</strong>.
        </p>
        <p>{t.docsCancelEvent.warning.text3}</p>
      </div>

      <p>{t.docsCancelEvent.warning.text4}</p>
    </section>
  );
}
