"use client";

import { use } from "react";
import { getDictionaryClient } from "@/dictionaries/client";
import { Locale } from "@/config/i18n.config";

export default function TermsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryClient(lang);

  return (
    <section className="min-h-screen flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-white text-center mb-8">{t.terms.title}</h1>

      <div className="bg-[#221f41] border border-[#332f5d] p-8 rounded-xl shadow-md w-full max-w-4xl text-gray-200 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.terms.permissionsTitle}</h2>
          <p>{t.terms.permissionsContent}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.terms.restrictionsTitle}</h2>
          <p>{t.terms.restrictionsContent}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.terms.acceptanceTitle}</h2>
          <p>{t.terms.acceptanceContent}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.terms.contactTitle}</h2>
          <p>{t.terms.contactContent}</p>
        </div>
      </div>
    </section>
  );
}
