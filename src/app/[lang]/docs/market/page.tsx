import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Image from "next/image";
import { use } from "react";

export default function MarketPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsMarketPage.title}</h1>

      <p>
        {t.docsMarketPage.descriptionInitial}{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsMarketPage.descriptionCode}</code>{" "}
        {t.docsMarketPage.descriptionFinal}
      </p>

      <Image src="/market.png" alt="Participar do Evento" quality={100} width={400} height={200} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          📦 <strong>{t.docsMarketPage.optionalFields.itemStrong}</strong> {t.docsMarketPage.optionalFields.itemDesc}
        </p>
        <p>
          🏷️ <strong>{t.docsMarketPage.optionalFields.tierStrong}</strong> {t.docsMarketPage.optionalFields.tierDesc}
        </p>
        <p>
          🏙️ <strong>{t.docsMarketPage.optionalFields.cityStrong}</strong> {t.docsMarketPage.optionalFields.cityDesc}
        </p>
        <p>
          🌐 <strong>{t.docsMarketPage.optionalFields.serverStrong}</strong>{" "}
          {t.docsMarketPage.optionalFields.serverDesc}
        </p>
      </div>

      <p>
        {t.docsMarketPage.tipsInitial} <code className="bg-gray-800 px-2 py-1 rounded text-sm">TAB</code>{" "}
        {t.docsMarketPage.tipsMid} <code className="bg-gray-800 px-2 py-1 rounded text-sm">/preco</code>
        {t.docsMarketPage.tipsFinal}
      </p>

      <p>
        💡 <strong>{t.docsMarketPage.example.text}</strong>{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsMarketPage.example.code}</code>
      </p>

      <h2 className="text-xl font-semibold pt-4">{t.docsMarketPage.changeLanguageTitle}</h2>

      <p>
        {t.docsMarketPage.changeLanguageDescriptionInitial}{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">/price-lang</code>{" "}
        {t.docsMarketPage.changeLanguageDescriptionFinal}
      </p>
    </section>
  );
}
