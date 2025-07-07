import { Locale } from "@/config/i18n.config";
import { CommandItem } from "../../components/CommandItem";
import { getDictionaryServer } from "@/dictionaries/server";
import { use } from "react";

export default function GerenciarSaldoPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsBalanceChannel.title}</h1>

      <p>{t.docsBalanceChannel.description}</p>

      <div className="space-y-4">
        <CommandItem
          name={t.docsBalanceChannel.commands.command1.name}
          description={t.docsBalanceChannel.commands.command1.description}
        />

        <CommandItem
          name={t.docsBalanceChannel.commands.command2.name}
          description={t.docsBalanceChannel.commands.command2.description}
        />

        <CommandItem
          name={t.docsBalanceChannel.commands.command3.name}
          description={t.docsBalanceChannel.commands.command3.description}
        />

        <CommandItem
          name={t.docsBalanceChannel.commands.command4.name}
          description={t.docsBalanceChannel.commands.command4.description}
        />
      </div>
    </section>
  );
}
