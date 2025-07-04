"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function ContributionPage() {
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
        // @ts-ignore
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
        💜 Ajude o <span className="text-indigo-500">Albion Event Bot</span> a se manter{" "}
        <span className="text-green-400">Online</span>
      </h1>

      <div className="mt-6 bg-[#221f41] border border-[#332f5d] p-8 rounded-xl shadow-md w-full max-w-4xl">
        <p className="text-gray-200 text-lg text-left mx-auto max-w-3xl">
          Esse bot é totalmente gratuito e foi criado para facilitar a vida da comunidade — mas, como qualquer serviço
          online, ele gera custos mensais com servidores, banco de dados, monitoramento e manutenção. Se você gosta do
          bot, usa com frequência ou simplesmente quer apoiar esse projeto, considere contribuir com qualquer valor.{" "}
          <strong>Sua ajuda permite:</strong>
        </p>

        <ul className="mt-5 list-disc list-inside text-base text-amber-300 space-y-1 text-left max-w-3xl mx-auto">
          <li>Manter o bot online 24/7</li>
          <li>Garantir estabilidade e atualizações frequentes</li>
          <li>Adicionar novas funcionalidades</li>
          <li>Cobrir custos de infraestrutura e suporte</li>
        </ul>

        {/* Caixa com PIX e PayPal lado a lado */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
          {/* Caixa PIX */}
          <div className="flex-1 border border-[#332f5d] p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Contribua via PIX</h3>
            <Image alt="QR Code PIX" src="/transferir.png" width={250} height={100} className="mx-auto" />
          </div>

          {/* Caixa PayPal */}
          <div className="flex-1 border border-[#332f5d] p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Contribua via PayPal</h3>
            <div id="paypal-donate-button" className="flex justify-center"></div>
          </div>
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Toda contribuição, por menor que seja, faz uma grande diferença. 💜
        </p>
      </div>
    </section>
  );
}
