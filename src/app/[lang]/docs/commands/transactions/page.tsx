import { use } from "react";
import { CommandItem } from "../../components/CommandItem";
import { getDictionaryServer } from "@/dictionaries/server";
import { Locale } from "@/config/i18n.config";

export default function TransacoesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsTransactionChannel.title}</h1>

      <p>
        {t.docsTransactionChannel.descriptionInitial} <strong>Admin</strong>
        {t.docsTransactionChannel.descriptionFinal}
      </p>

      <div className="space-y-4">
        <CommandItem
          name={t.docsTransactionChannel.commands.command1.name}
          description={t.docsTransactionChannel.commands.command1.description}
          admin
        />

        <CommandItem
          name={t.docsTransactionChannel.commands.command2.name}
          description={t.docsTransactionChannel.commands.command2.description}
          admin
        />

        <CommandItem
          name={t.docsTransactionChannel.commands.command3.name}
          description={t.docsTransactionChannel.commands.command3.description}
          admin
        />

        <CommandItem
          name={t.docsTransactionChannel.commands.command4.name}
          description={t.docsTransactionChannel.commands.command4.description}
          admin
        />

        <CommandItem
          name={t.docsTransactionChannel.commands.command5.name}
          description={t.docsTransactionChannel.commands.command5.description}
          admin
        />

        <CommandItem
          name={t.docsTransactionChannel.commands.command6.name}
          description={t.docsTransactionChannel.commands.command6.description}
        />
      </div>
    </section>
  );
}
