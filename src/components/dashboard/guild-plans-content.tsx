"use client";

import { useDashboardGuild } from "@/components/dashboard/dashboard-guild-context";

export function GuildPlansContent() {
  const { language } = useDashboardGuild();
  const isPortuguese = language === "pt-BR";
  const plans = [
    { duration: isPortuguese ? "1 mês" : "1 month", price: "R$ 00,00", badge: isPortuguese ? "Flexível" : "Flexible", tone: "from-[#151729] via-[#191532] to-[#080a10]" },
    { duration: isPortuguese ? "6 meses" : "6 months", price: "R$ 00,00", badge: isPortuguese ? "Mais escolhido" : "Most chosen", tone: "from-[#21152e] via-[#321b3a] to-[#0b0c13]" },
    { duration: isPortuguese ? "1 ano" : "1 year", price: "R$ 00,00", badge: isPortuguese ? "Melhor valor" : "Best value", tone: "from-[#2c2112] via-[#31201f] to-[#0b0c13]" },
  ];

  return <>
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">{isPortuguese ? "Planos" : "Plans"}</p>
    <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{isPortuguese ? "Escolha como evoluir sua guild" : "Choose how your guild grows"}</h1>
    <p className="mt-3 max-w-2xl text-slate-400">{isPortuguese ? "Valores demonstrativos. Checkout e ativação serão disponibilizados em breve." : "Demonstration prices. Checkout and activation will be available soon."}</p>
    <div className="mt-9 grid gap-5 xl:grid-cols-3">
      {plans.map((plan, index) => <article key={plan.duration} className={`relative min-h-[360px] overflow-hidden rounded-3xl border ${index === 1 ? "border-violet-300/60" : "border-white/12"} bg-gradient-to-br ${plan.tone} p-6 shadow-2xl`}>
        <div className="absolute inset-0 bg-[url('/dashboard-plans-fantasy.png')] bg-cover bg-center opacity-25 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d16]/15 via-[#0b0d16]/65 to-[#0b0d16]" />
        <div className="relative flex h-full flex-col"><span className="w-fit rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-bold text-white backdrop-blur">{plan.badge}</span><div className="mt-auto"><p className="text-sm font-medium text-slate-300">Premium</p><h2 className="mt-1 text-3xl font-bold text-white">{plan.duration}</h2><p className="mt-4 text-3xl font-black tracking-tight text-white">{plan.price}</p><p className="mt-1 text-xs text-slate-300">{isPortuguese ? "Valor de demonstração" : "Demonstration price"}</p><ul className="mt-5 space-y-2 text-sm text-slate-200"><li>✓ {isPortuguese ? "Eventos premium" : "Premium Events"}</li><li>✓ {isPortuguese ? "Killboard premium" : "Premium Killboard"}</li><li>✓ {isPortuguese ? "Suporte prioritário" : "Priority support"}</li></ul><button type="button" disabled className="mt-6 w-full cursor-not-allowed rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-slate-300">{isPortuguese ? "Em breve" : "Coming soon"}</button></div></div>
      </article>)}
    </div>
  </>;
}
