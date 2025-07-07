import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function CreateEvent({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsCreateEvent.title}</h1>

      <p>
        {t.docsCreateEvent.descriptionInitial}{" "}
        <strong className="text-white">{t.docsCreateEvent.descriptionInitalStrong}</strong>{" "}
        {t.docsCreateEvent.descriptionMid} <code className="bg-gray-800 px-2 py-1 rounded text-sm">/setup</code>
        {t.docsCreateEvent.descriptionMid2} <strong className="text-white">embed</strong>{" "}
        {t.docsCreateEvent.descriptionFinal}
      </p>

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 space-y-2 border border-gray-700">
        <p className="font-semibold">{t.docsCreateEvent.embedTitle}</p>
        <p>{t.docsCreateEvent.embedDescription}</p>
        <p>
          <strong>{t.docsCreateEvent.embedFields.guildTax}</strong> 0%
        </p>
        <p>
          <strong>{t.docsCreateEvent.embedFields.sellerTax}</strong> 0%
        </p>
        <p>
          <strong>{t.docsCreateEvent.embedFields.expiration}</strong> {t.docsCreateEvent.embedFields.expirationValue}
        </p>
      </div>

      <p>
        <strong>{t.docsCreateEvent.guildTaxStrong}</strong> {t.docsCreateEvent.and}{" "}
        <strong>{t.docsCreateEvent.sellerTaxStrong}</strong> {t.docsCreateEvent.taxDescription}
      </p>

      <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
        <li>
          {t.docsCreateEvent.the} <strong>{t.docsCreateEvent.guildTaxStrong}</strong> {t.docsCreateEvent.guildTaxDesc}
        </li>
        <li>
          {t.docsCreateEvent.the} <strong>{t.docsCreateEvent.sellerTaxStrong}</strong> {t.docsCreateEvent.sellerTaxDesc}
        </li>
        <li>
          {t.docsCreateEvent.commandsTitle}
          <ul className="list-disc ml-4 pl-6 space-y-1 mt-1">
            <li>
              <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsCreateEvent.updateGuildFeeCommand}</code>
            </li>
            <li>
              <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsCreateEvent.updateSellerFeeCommand}</code>
            </li>
          </ul>
        </li>
      </ul>

      <p>
        {t.docsCreateEvent.expirationDescInitital}{" "}
        <strong className="text-white">{t.docsCreateEvent.expirationDescStrong}</strong>
        {t.docsCreateEvent.expirationDescFinal}
      </p>

      <p>
        {t.docsCreateEvent.eventDescriptionInitial}{" "}
        <strong className="text-white">{t.docsCreateEvent.eventDescriptionStrong}</strong>
        {t.docsCreateEvent.eventDescriptionFinal}{" "}
        <strong className="text-white">{t.docsCreateEvent.eventButton}</strong>.
        <Image
          className="mt-2 mb-2"
          src="/create-event.png"
          alt="create event"
          quality={100}
          width={200}
          height={100}
        />
        {t.docsCreateEvent.createdEventDescriptionInitial}{" "}
        <strong className="text-white">{t.docsCreateEvent.createdEventDescriptionStrong}</strong>
        {t.docsCreateEvent.createdEventDescriptionFinal}
      </p>

      <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
        <li>
          <Link href="/docs/use/participate-event" className="underline hover:text-white">
            {t.docsCreateEvent.links.ParticipateEvent}
          </Link>
        </li>
        <li>
          <Link href="/docs/use/start-event" className="underline hover:text-white">
            {t.docsCreateEvent.links.StartEvent}
          </Link>
        </li>
        <li>
          <Link href="/docs/use/delete-event" className="underline hover:text-white">
            {t.docsCreateEvent.links.CancelEvent}
          </Link>
        </li>
        <li>
          <Link href="/docs/use/finish-event" className="underline hover:text-white">
            {t.docsCreateEvent.links.FinishEvent}
          </Link>
        </li>
      </ul>
    </section>
  );
}
