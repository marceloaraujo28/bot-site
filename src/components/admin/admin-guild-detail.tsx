"use client";

import { ArrowLeft, CalendarClock, CheckCircle2, CreditCard, Database, History, LoaderCircle, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Language = "pt-BR" | "en-US";
type Product = "EVENTS_MARKET" | "KILLBOARD" | "BUNDLE";
type Action = "grant" | "change" | "extend" | "revoke";

type Detail = {
  guild: Record<string, unknown>;
  billing: { plan: string; isTrial: boolean; validUntil: string | null; features: string[]; usage: Record<string, number> };
  subscriptions: Array<Record<string, unknown>>;
  webhookEvents: Array<Record<string, unknown>>;
  audit: Array<Record<string, unknown>>;
};

const text = {
  "pt-BR": {
    back: "Servidores", title: "Gestão da guild", configured: "Configurada", installed: "Instalada", plan: "Plano atual", trial: "Trial", validUntil: "Validade", noExpiry: "Sem vencimento", features: "Recursos ativos", usage: "Uso de hoje (UTC)",
    manual: "Ajuste manual de plano", manualDescription: "Esta ação é auditada e não representa uma cobrança de pagamento.", action: "Ação", grant: "Conceder plano", change: "Trocar plano", extend: "Estender plano", revoke: "Revogar plano manual", product: "Produto", duration: "Duração em dias", reason: "Motivo obrigatório", confirm: "Confirmo que quero aplicar esta alteração manual.", submit: "Aplicar alteração", applying: "Aplicando…", success: "Alteração aplicada e registrada na auditoria.", error: "Não foi possível aplicar a alteração.",
    subscriptions: "Assinaturas", webhooks: "Eventos de pagamento", audit: "Auditoria", empty: "Nenhum registro encontrado.", status: "Status", provider: "Provedor", started: "Início", expires: "Vencimento", received: "Recebido", actionLabel: "Ação", actor: "Autor", reasonLabel: "Motivo", unknown: "Não informado", internal: "Interno", free: "Gratuito",
  },
  "en-US": {
    back: "Servers", title: "Guild management", configured: "Configured", installed: "Installed", plan: "Current plan", trial: "Trial", validUntil: "Validity", noExpiry: "No expiry", features: "Active features", usage: "Today’s usage (UTC)",
    manual: "Manual plan adjustment", manualDescription: "This action is audited and does not represent a payment charge.", action: "Action", grant: "Grant plan", change: "Change plan", extend: "Extend plan", revoke: "Revoke manual plan", product: "Product", duration: "Duration in days", reason: "Required reason", confirm: "I confirm I want to apply this manual change.", submit: "Apply change", applying: "Applying…", success: "Change applied and recorded in the audit log.", error: "Could not apply the change.",
    subscriptions: "Subscriptions", webhooks: "Payment events", audit: "Audit", empty: "No records found.", status: "Status", provider: "Provider", started: "Started", expires: "Expires", received: "Received", actionLabel: "Action", actor: "Actor", reasonLabel: "Reason", unknown: "Not provided", internal: "Internal", free: "Free",
  },
} as const;

const controlClass = "w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-400/70";

function formatDate(value: unknown, language: Language) {
  if (!value) return text[language].noExpiry;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? text[language].unknown : new Intl.DateTimeFormat(language, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function productName(product: unknown, language: Language) {
  if (!product || product === "FREE") return text[language].free;
  if (product === "EVENTS_MARKET") return "Events + Market";
  if (product === "KILLBOARD") return "Killboard";
  return "Combo";
}

export function AdminGuildDetail({ language, detail }: { language: Language; detail: Detail }) {
  const t = text[language];
  const guild = detail.guild;
  const billing = detail.billing;
  const guildId = String(guild.id ?? "");
  const installed = Boolean(guild.installedAt);
  const usage = [
    ["EVENTS_STARTED", language === "pt-BR" ? "Eventos iniciados" : "Events started", billing.usage.EVENTS_STARTED ?? 0, billing.features.includes("EVENTS") ? "∞" : "3"],
    ["KILLBOARD_NOTIFICATION", "Killboard", billing.usage.KILLBOARD_NOTIFICATION ?? 0, billing.features.includes("KILLBOARD") ? "∞" : "15"],
    ["MARKET_QUERY", "Market", billing.usage.MARKET_QUERY ?? 0, "∞"],
  ];

  return <div className="space-y-7">
    <Link href="/admin/guilds" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"><ArrowLeft className="h-4 w-4" />{t.back}</Link>
    <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/8 bg-[#11131a] p-6 shadow-[0_20px_55px_rgba(0,0,0,.25)] sm:p-8 lg:flex-row lg:items-start">
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-violet-300">Backoffice / Guild</p><h1 className="mt-2 text-3xl font-bold text-white">{String(guild.guildName ?? guildId)}</h1><p className="mt-2 text-sm text-slate-500">{guildId}</p><div className="mt-4 flex flex-wrap gap-2"><Badge tone="emerald" label={t.configured} /><Badge tone={installed ? "amber" : "slate"} label={installed ? t.installed : (language === "pt-BR" ? "Sem presença registrada" : "No recorded installation")} />{billing.isTrial && <Badge tone="violet" label={t.trial} />}</div></div>
      <div className="grid grid-cols-2 gap-3 sm:min-w-[330px]"><Info label={t.plan} value={productName(billing.plan, language)} /><Info label={t.validUntil} value={formatDate(billing.validUntil, language)} /></div>
    </div>

    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-white/8 bg-[#11131a] p-5"><h2 className="flex items-center gap-2 font-bold text-white"><Database className="h-4 w-4 text-violet-300" />{t.usage}</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{usage.map(([key, label, used, limit]) => <div key={String(key)} className="rounded-xl border border-white/8 bg-black/15 p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-white">{used}<span className="text-sm font-medium text-slate-500">/{limit}</span></p></div>)}</div></section>
        <section className="rounded-2xl border border-white/8 bg-[#11131a] p-5"><h2 className="flex items-center gap-2 font-bold text-white"><ShieldCheck className="h-4 w-4 text-emerald-300" />{t.features}</h2><div className="mt-4 flex flex-wrap gap-2">{billing.features.length ? billing.features.map((feature) => <Badge key={feature} tone="emerald" label={feature} />) : <span className="text-sm text-slate-500">{t.free}</span>}</div></section>
        <RecordTable language={language} title={t.subscriptions} icon={<CreditCard className="h-4 w-4 text-violet-300" />} rows={detail.subscriptions} columns={["product", "provider", "status", "currentPeriodStart", "currentPeriodEnd"]} />
        {detail.webhookEvents.length > 0 && <RecordTable language={language} title={t.webhooks} icon={<CalendarClock className="h-4 w-4 text-amber-300" />} rows={detail.webhookEvents} columns={["provider", "eventType", "status", "receivedAt"]} />}
        <RecordTable language={language} title={t.audit} icon={<History className="h-4 w-4 text-sky-300" />} rows={detail.audit} columns={["action", "actorDiscordUserId", "reason", "createdAt"]} />
      </div>
      <ManualPlanForm language={language} guildId={guildId} />
    </div>
  </div>;
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/8 bg-black/15 p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 truncate text-sm font-bold text-white" title={value}>{value}</p></div>; }
function Badge({ label, tone }: { label: string; tone: "emerald" | "amber" | "violet" | "slate" }) { const styles = { emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200", amber: "border-amber-400/30 bg-amber-400/10 text-amber-100", violet: "border-violet-400/30 bg-violet-400/10 text-violet-100", slate: "border-slate-400/20 bg-slate-400/10 text-slate-300" }[tone]; return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles}`}>{label}</span>; }

function RecordTable({ language, title, icon, rows, columns }: { language: Language; title: string; icon: React.ReactNode; rows: Array<Record<string, unknown>>; columns: string[] }) {
  const t = text[language];
  return <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#11131a]"><div className="flex items-center gap-2 border-b border-white/8 px-5 py-4 font-bold text-white">{icon}{title}<span className="ml-auto text-xs font-normal text-slate-500">{rows.length}</span></div>{rows.length ? <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-xs"><thead className="bg-black/15 text-slate-500"><tr>{columns.map((column) => <th className="px-4 py-3 font-semibold" key={column}>{column}</th>)}</tr></thead><tbody className="divide-y divide-white/6">{rows.map((row, index) => <tr key={String(row.id ?? index)}>{columns.map((column) => <td className="max-w-[220px] truncate px-4 py-3 text-slate-300" title={String(row[column] ?? "")} key={column}>{column.toLowerCase().includes("at") || column.toLowerCase().includes("end") || column.toLowerCase().includes("start") ? formatDate(row[column], language) : String(row[column] ?? t.unknown)}</td>)}</tr>)}</tbody></table></div> : <p className="p-5 text-sm text-slate-500">{t.empty}</p>}</section>;
}

function ManualPlanForm({ language, guildId }: { language: Language; guildId: string }) {
  const t = text[language]; const router = useRouter();
  const [action, setAction] = useState<Action>("grant"); const [product, setProduct] = useState<Product>("BUNDLE"); const [durationDays, setDurationDays] = useState("30"); const [reason, setReason] = useState(""); const [confirmed, setConfirmed] = useState(false); const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const needsPlan = action === "grant" || action === "change"; const needsDays = action !== "revoke";
  const canSubmit = reason.trim().length > 0 && confirmed && (!needsDays || Number(durationDays) >= 1);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!canSubmit) return; setState("loading"); try { const response = await fetch(`/api/admin/guilds/${guildId}/manual-plan`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, product: needsPlan ? product : undefined, durationDays: needsDays ? Number(durationDays) : undefined, reason: reason.trim() }) }); if (!response.ok) throw new Error(); setState("success"); setReason(""); setConfirmed(false); router.refresh(); } catch { setState("error"); } };
  return <aside className="h-fit rounded-2xl border border-violet-400/20 bg-gradient-to-b from-violet-500/[.12] to-[#11131a] p-5"><h2 className="flex items-center gap-2 font-bold text-white"><ShieldAlert className="h-4 w-4 text-violet-200" />{t.manual}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{t.manualDescription}</p><form onSubmit={submit} className="mt-5 space-y-4"><Field label={t.action}><select value={action} onChange={(event) => { setAction(event.target.value as Action); setConfirmed(false); }} className={controlClass}><option value="grant">{t.grant}</option><option value="change">{t.change}</option><option value="extend">{t.extend}</option><option value="revoke">{t.revoke}</option></select></Field>{needsPlan && <Field label={t.product}><select value={product} onChange={(event) => setProduct(event.target.value as Product)} className={controlClass}><option value="BUNDLE">Combo</option><option value="EVENTS_MARKET">Events + Market</option><option value="KILLBOARD">Killboard</option></select></Field>}{needsDays && <Field label={t.duration}><input value={durationDays} onChange={(event) => setDurationDays(event.target.value)} min="1" max="3650" type="number" className={controlClass} /></Field>}<Field label={t.reason}><textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} required rows={4} className={`${controlClass} resize-y`} /></Field><label className="flex cursor-pointer gap-2 text-xs leading-5 text-slate-300"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" className="mt-1 accent-violet-400" />{t.confirm}</label>{state === "success" && <p className="flex gap-2 text-xs text-emerald-200"><CheckCircle2 className="h-4 w-4 shrink-0" />{t.success}</p>}{state === "error" && <p className="flex gap-2 text-xs text-rose-200"><XCircle className="h-4 w-4 shrink-0" />{t.error}</p>}<button disabled={!canSubmit || state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-45">{state === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" />}{state === "loading" ? t.applying : t.submit}</button></form></aside>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-slate-300"><span className="mb-1.5 block">{label}</span>{children}</label>; }
