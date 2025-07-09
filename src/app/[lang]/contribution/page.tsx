"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { getDictionaryClient } from "@/dictionaries/client";
import { Locale } from "@/config/i18n.config";

export default function ContributionPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryClient(lang);

  const [copyText, setCopyText] = useState("Copiar código do QR Code");

  const handleClick = () => {
    const codigoPix =
      "00020126580014BR.GOV.BCB.PIX0136d285bbea-bb6d-4a5a-8711-9cbd47a14aaa5204000053039865802BR5922Marcelo Messias Araujo6009SAO PAULO62140510gLjxiK7ZOj63040767";
    navigator.clipboard.writeText(codigoPix);
    setCopyText("Copiado");

    setTimeout(() => {
      setCopyText("Copiar código do QR Code");
    }, 3000);
  };

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
        // @ts-expect-error: PayPal types not available globally, injected via external script
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
    <section className="min-h-screen flex flex-col items-center p-5">
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
            <Image alt="QR Code PIX" src="/transferirPix.png" width={250} height={100} className="mx-auto" />

            <button
              onClick={() => handleClick()}
              className="mt-4 px-4 py-2 bg-[#1a1832] text-white rounded hover:bg-amber-500 transition cursor-pointer"
            >
              {copyText}
            </button>
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
