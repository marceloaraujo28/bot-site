import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import { use } from "react";

export default function ParticipateEvent({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsParticipateEvent.title}</h1>

      <p>
        {t.docsParticipateEvent.descriptionInitial}{" "}
        <strong className="text-white">{t.docsParticipateEvent.descriptionStrong}</strong>{" "}
        {t.docsParticipateEvent.descriptionMid} <strong className="text-white">embed</strong>{" "}
        {t.docsParticipateEvent.descriptionFinal}
      </p>

      <p>
        {t.docsParticipateEvent.participateText}{" "}
        <strong className="text-white">{t.docsParticipateEvent.participateTextStrong}</strong>{" "}
        {t.docsParticipateEvent.participateTextFinal}
      </p>

      <Image
        src="/participate-event.png"
        alt={t.docsParticipateEvent.participateImageAlt}
        quality={100}
        width={272}
        height={101}
      />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>{t.docsParticipateEvent.participateWarning.text1}</p>
        <p>{t.docsParticipateEvent.participateWarning.text2}</p>
      </div>

      <p className="text-yellow-400 font-semibold">{t.docsParticipateEvent.voiceChannelWarning.text}</p>

      <p>{t.docsParticipateEvent.voiceChannelWarning.textFinal}</p>

      <p className="text-red-500 font-semibold">{t.docsParticipateEvent.leaveEventWarning.text}</p>
    </section>
  );
}
