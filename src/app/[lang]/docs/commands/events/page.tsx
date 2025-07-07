import { Locale } from "@/config/i18n.config";
import { CommandItem } from "../../components/CommandItem";
import { use } from "react";
import { getDictionaryServer } from "@/dictionaries/server";

export default function ComandosEventosPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsEventChannel.title}</h1>

      <p>{t.docsEventChannel.description}</p>

      <div className="space-y-4">
        <CommandItem
          name={t.docsEventChannel.commands.command1.name}
          description={t.docsEventChannel.commands.command1.description}
        />

        <CommandItem
          name={t.docsEventChannel.commands.command2.name}
          description={t.docsEventChannel.commands.command2.description}
        />

        <CommandItem
          name={t.docsEventChannel.commands.command3.name}
          description={t.docsEventChannel.commands.command3.description}
        />

        <CommandItem
          name={t.docsEventChannel.commands.command4.name}
          description={t.docsEventChannel.commands.command4.description}
          admin
        />

        <CommandItem
          name={t.docsEventChannel.commands.command5.name}
          description={t.docsEventChannel.commands.command5.description}
          admin
        />

        <CommandItem
          name={t.docsEventChannel.commands.command6.name}
          description={t.docsEventChannel.commands.command6.description}
        />

        <CommandItem
          name={t.docsEventChannel.commands.command7.name}
          description={t.docsEventChannel.commands.command7.description}
        />
      </div>
    </section>
  );
}
