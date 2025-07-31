"use client";

import { use, useEffect, useState } from "react";
import { getDictionaryClient } from "@/dictionaries/client";
import { Locale } from "@/config/i18n.config";

export default function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryClient(lang);

  return (
    <section className="min-h-screen flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-white text-center mb-8">{t.privacyPolicy.title}</h1>

      <div className="bg-[#221f41] border border-[#332f5d] p-8 rounded-xl shadow-md w-full max-w-4xl text-gray-200 max-w-3xl space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.infoCollectedTitle}</h2>
          <p>{t.privacyPolicy.infoCollectedText}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.dataUseTitle}</h2>
          <p>{t.privacyPolicy.dataUseText}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.storageTitle}</h2>
          <p>{t.privacyPolicy.storageText}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.userRightsTitle}</h2>
          <p>{t.privacyPolicy.userRightsText}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.updatesTitle}</h2>
          <p>{t.privacyPolicy.updatesText}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-amber-400 mb-2">{t.privacyPolicy.disclaimerTitle}</h2>
          <p>{t.privacyPolicy.disclaimerText}</p>
        </div>
      </div>
    </section>
  );
}
