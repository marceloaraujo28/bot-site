"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import { getDictionaryClient } from "@/dictionaries/client";
import { Locale } from "@/config/i18n.config";

export default function ContributionPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryClient(lang);

  useEffect(() => {
    const scriptId = "paypal-donate-sdk";

    // Evita adicionar o script mais de uma vez
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
      script.setAttribute("charset", "UTF-8");
      script.onload = () => {
        renderPaypalButton();
      };
      document.body.appendChild(script);
    } else {
      renderPaypalButton();
    }

    function renderPaypalButton() {
      const container = document.getElementById("paypal-donate-button");
      if (container && container.children.length === 0) {
        // @ts-expect-error
        window.PayPal?.Donation.Button({
          env: "production",
          hosted_button_id: "G69XAGBJGZKLQ",
          image: {
            src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",
            alt: "Donate with PayPal button",
            title: "PayPal - The safer, easier way to pay online!",
          },
        }).render("#paypal-donate-button");
      }
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-white text-center">
        {t.ContributionPage.titleInitial} <span className="text-indigo-500">Albion Event Bot</span>{" "}
        {t.ContributionPage.titleMid} <span className="text-green-400">Online</span>
      </h1>

      <div className="mt-6 bg-[#221f41] border border-[#332f5d] p-8 rounded-xl shadow-md w-full max-w-4xl">
        <p className="text-gray-200 text-lg text-left mx-auto max-w-3xl">
          {t.ContributionPage.description} <strong>{t.ContributionPage.contributionString}</strong>
        </p>

        <ul className="mt-5 list-disc list-inside text-base text-amber-300 space-y-1 text-left max-w-3xl mx-auto">
          <li>{t.ContributionPage.contribuitionList.item1}</li>
          <li>{t.ContributionPage.contribuitionList.item2}</li>
          <li>{t.ContributionPage.contribuitionList.item3}</li>
          <li>{t.ContributionPage.contribuitionList.item4}</li>
        </ul>

        {/* Caixa com PIX e PayPal lado a lado */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
          {/* Caixa PIX */}
          <div className="flex-1 border border-[#332f5d] p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">{t.ContributionPage.pixText}</h3>
            <Image alt="QR Code PIX" src="/transferir.png" width={250} height={100} className="mx-auto" />
          </div>

          {/* Caixa PayPal */}
          <div className="flex-1 border border-[#332f5d] p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">{t.ContributionPage.paypalText}</h3>
            <div id="paypal-donate-button" className="flex justify-center"></div>
          </div>
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">{t.ContributionPage.finalText}</p>
      </div>
    </section>
  );
}
