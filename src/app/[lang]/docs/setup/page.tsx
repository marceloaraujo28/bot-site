import { Locale } from "@/config/i18n.config";
import { getDictionaryServer } from "@/dictionaries/server";
import Link from "next/link";
import { use } from "react";

export default function SetupPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t.docsSetup.title}</h1>

      <p>
        {t.docsSetup.descriptionInitial} <code className="bg-gray-800 px-2 py-1 rounded text-sm">/setup</code>{" "}
        {t.docsSetup.descriptionMid}{" "}
        <Link href="/docs/channels" className="text-blue-700 hover:underline">
          {t.docsSetup.channelsText}
        </Link>{" "}
        {t.docsSetup.descriptionFinal}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsSetup.ptText}</code> e{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">{t.docsSetup.enText}</code>
      </p>

      <h2 className="text-xl font-semibold mt-6">
        {t.docsSetup.sulTitleInital} <code>/setup</code> {t.docsSetup.sulTitleMid}
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>{t.docsSetup.listItems.item1}</li>
        <li>{t.docsSetup.listItems.item2}</li>
        <li>{t.docsSetup.listItems.item3}</li>
      </ul>

      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold text-purple-300 mb-1">{t.docsSetup.createdRoleTitle}</h3>
        <p className="text-gray-300">
          {t.docsSetup.createdRoleDesc} <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">/setup</code>{" "}
          {t.docsSetup.createdRoleDescMid}
        </p>

        <div className="bg-purple-900/20 border-l-4 border-purple-500 mt-4 p-3 rounded">
          <p className="text-purple-300 font-semibold">{t.docsSetup.roleName}</p>
          <p className="text-sm text-gray-400">{t.docsSetup.roleDesc}</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
        <p className="text-yellow-300 font-semibold">{t.docsSetup.importantTitle}</p>
        <p>{t.docsSetup.importantDesc}</p>
      </div>
    </section>
  );
}
