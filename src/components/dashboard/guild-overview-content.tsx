"use client";

import { useDashboardGuild } from "@/components/dashboard/dashboard-guild-context";
import {
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TrialActivationButton } from "@/components/dashboard/trial-activation-button";

const FREE_EVENT_LIMIT = 3;
const FREE_KILLBOARD_LIMIT = 15;

function formatDate(value: string, language: "pt-BR" | "en-US") {
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function GuildOverviewContent() {
  const { guild, language, billing } = useDashboardGuild();
  const isPortuguese = language === "pt-BR";
  const plansHref = `/dashboard/${guild.id}/plans`;
  const [feedback, setFeedback] = useState<
    "activated" | "already_used" | "paid_subscription" | "error" | null
  >(null);

  const planName = billing.isTrial
    ? isPortuguese
      ? "Teste Premium"
      : "Premium Trial"
    : billing.plan === "FREE"
      ? isPortuguese
        ? "Gratuito"
        : "Free"
      : "Premium";
  const isPremium = billing.plan !== "FREE";

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
        {isPortuguese ? "Visão geral" : "Overview"}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {isPortuguese
          ? `Tudo sob controle em ${guild.name}`
          : `Everything under control in ${guild.name}`}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        {isPortuguese
          ? "Acompanhe seu plano, consumo diário e recursos premium da sua guild."
          : "Track your guild's plan, daily usage and premium features."}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard
          label={isPortuguese ? "Plano atual" : "Current plan"}
          value={planName}
          accent="violet"
        />
        <MetricCard
          label={isPortuguese ? "Status do bot" : "Bot status"}
          value={isPortuguese ? "Ativo" : "Active"}
          accent="emerald"
        />
        <MetricCard
          label={isPortuguese ? "Validade" : "Valid until"}
          value={
            billing.validUntil
              ? formatDate(billing.validUntil, language)
              : isPortuguese
                ? "Sem expiração"
                : "No expiry"
          }
          accent="amber"
        />
      </div>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {isPremium
                ? isPortuguese ? "Recursos Premium" : "Premium features"
                : isPortuguese ? "Uso de hoje" : "Today's usage"}
            </p>
            <h2 className="mt-2 text-xl font-bold text-white">
              {isPremium
                ? isPortuguese ? "Sua guild está sem limites" : "Your guild is unlimited"
                : isPortuguese ? "Cotas gratuitas em UTC" : "Free quotas in UTC"}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {isPremium
              ? isPortuguese ? "Enquanto o plano estiver ativo." : "While your plan is active."
              : isPortuguese ? "Market permanece gratuito e ilimitado." : "Market remains free and unlimited."}
          </p>
        </div>
        {isPremium ? (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <FeatureCard label={isPortuguese ? "Eventos" : "Events"} value={isPortuguese ? "Ilimitados" : "Unlimited"} />
            <FeatureCard label="Killboard" value={isPortuguese ? "Ilimitado" : "Unlimited"} />
            <FeatureCard label="Market" value={isPortuguese ? "Gratuito e ilimitado" : "Free and unlimited"} />
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <UsageCard
              label={isPortuguese ? "Eventos iniciados" : "Events started"}
              count={billing.usage.EVENTS_STARTED}
              limit={FREE_EVENT_LIMIT}
              language={language}
            />
            <UsageCard
              label={isPortuguese ? "Notificações de Killboard" : "Killboard notifications"}
              count={billing.usage.KILLBOARD_NOTIFICATION}
              limit={FREE_KILLBOARD_LIMIT}
              language={language}
            />
          </div>
        )}
      </section>

      <section className="relative mt-8 overflow-hidden rounded-3xl border border-violet-300/20 bg-[#131526] p-7 shadow-2xl sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(137,92,246,0.25),transparent_30%),radial-gradient(circle_at_20%_90%,rgba(245,158,11,0.18),transparent_35%)]" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            {isPortuguese ? "Teste premium" : "Premium trial"}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white">
            {billing.isTrial
              ? isPortuguese
                ? "Seu teste de Eventos e Killboard está ativo"
                : "Your Events and Killboard trial is active"
              : isPortuguese
                ? "Desbloqueie Eventos e Killboard por 7 dias"
                : "Unlock Events and Killboard for 7 days"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {billing.isTrial
              ? isPortuguese
                ? "O teste não tem cobrança automática e expira na data informada acima."
                : "The trial has no automatic charge and expires on the date above."
              : billing.trialUsed
                ? isPortuguese
                  ? "Esta guild já utilizou o período gratuito. Em breve você poderá escolher um plano pago."
                  : "This guild has already used its free period. You will be able to choose a paid plan soon."
                : isPortuguese
                  ? "Ative uma única vez quando quiser. Não solicitaremos cartão nem criaremos cobrança automática."
                  : "Activate it once whenever you are ready. No card and no automatic charge are required."}
          </p>

          {feedback === "activated" && (
            <Feedback tone="success">
              {isPortuguese
                ? "Teste ativado com sucesso. Atualizando seu painel…"
                : "Trial activated successfully. Updating your dashboard…"}
            </Feedback>
          )}
          {feedback === "already_used" && (
            <Feedback tone="neutral">
              {isPortuguese
                ? "Esta guild já utilizou o teste gratuito."
                : "This guild has already used the free trial."}
            </Feedback>
          )}
          {feedback === "paid_subscription" && (
            <Feedback tone="neutral">
              {isPortuguese
                ? "Esta guild já possui uma assinatura ativa."
                : "This guild already has an active subscription."}
            </Feedback>
          )}
          {feedback === "error" && (
            <Feedback tone="error">
              {isPortuguese
                ? "Não foi possível ativar o teste agora. Confirme sua permissão de Administrador e tente novamente."
                : "We could not activate the trial now. Confirm your Administrator permission and try again."}
            </Feedback>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {!isPremium && !billing.trialUsed && (
              <TrialActivationButton guildId={guild.id} language={language} onResult={setFeedback} />
            )}
            <Link
              href={plansHref}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-300/35 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-100 transition hover:bg-violet-500/20"
            >
              {isPortuguese ? "Ver planos" : "View plans"}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "violet" | "emerald" | "amber";
}) {
  const colors = {
    violet: "border-violet-400/25",
    emerald: "border-emerald-400/25",
    amber: "border-amber-400/25",
  }[accent];
  return (
    <article className={`rounded-2xl border bg-white/[0.025] p-5 ${colors}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-xl font-bold text-white">{value}</p>
    </article>
  );
}

function UsageCard({
  label,
  count,
  limit,
  language,
}: {
  label: string;
  count: number;
  limit: number;
  language: "pt-BR" | "en-US";
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/10 p-5">
      <p className="text-sm font-semibold text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">
        {count} / {limit}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {language === "pt-BR" ? "Reinicia à meia-noite UTC" : "Resets at midnight UTC"}
      </p>
    </article>
  );
}

function FeatureCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
      <p className="text-sm font-semibold text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-bold text-emerald-200">{value}</p>
    </article>
  );
}

function Feedback({
  tone,
  children,
}: {
  tone: "success" | "neutral" | "error";
  children: React.ReactNode;
}) {
  const className = {
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
    neutral: "border-white/15 bg-white/5 text-slate-200",
    error: "border-rose-400/30 bg-rose-400/10 text-rose-100",
  }[tone];
  return (
    <p className={`mt-5 rounded-xl border px-4 py-3 text-sm ${className}`}>
      {tone === "success" && <CheckCircle2 className="mr-2 inline h-4 w-4" />}
      {children}
    </p>
  );
}
