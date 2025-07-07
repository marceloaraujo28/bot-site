import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import { use } from "react";

export default function ChannelsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t.docsChannels.title}</h1>
        <p className="text-muted-foreground  max-w-prose">
          {t.docsChannels.descriptionInitial} <code className="bg-muted px-1 py-0.5 rounded ">/setup</code>
          {t.docsChannels.descriptionFinal}
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">{t.docsChannels.subTitle}</h2>
          <div className="space-y-4">
            {t.docsChannels.channels.map((channel, index) => (
              <ChannelCard key={index} name={channel.name} description={channel.desc} />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">{t.docsChannels.categoryText}</h2>
          <div className="space-y-4">
            <ChannelCard name={t.docsChannels.ChannelCard1Title} description={t.docsChannels.ChannelCard1Desc} />
            <ChannelCard name={t.docsChannels.ChannelCard2Title} description={t.docsChannels.ChannelCard2Desc} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-l-2 border-gray-600 pl-4">
      <p className="font-medium text-gray-100">{name}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
