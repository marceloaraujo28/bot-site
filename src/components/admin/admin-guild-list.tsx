"use client";

import { ChevronLeft, ChevronRight, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "pt-BR" | "en-US";

type AdminGuild = {
  guildId: string;
  guildName: string | null;
  language: string | null;
  configured: boolean;
  installed: boolean;
  plan: "EVENTS_MARKET" | "KILLBOARD" | "BUNDLE" | null;
  subscriptionStatus: string | null;
  validUntil: string | null;
};

type GuildResponse = { guilds: AdminGuild[]; page: number; pageSize: number; total: number };

const copy = {
  "pt-BR": {
    title: "Servidores", description: "Pesquise instalações, configurações e planos sem depender da conta administradora da guild.",
    search: "Nome ou ID da guild", allStatuses: "Todos os status", allPlans: "Todos os planos", configured: "Configurado", installed: "Instalado", absent: "Ausente", free: "Gratuito",
    loading: "Carregando servidores…", empty: "Nenhum servidor encontrado para estes filtros.", details: "Gerenciar", previous: "Anterior", next: "Próxima", page: "Página", of: "de",
    botActive: "Bot ativo", botInstalled: "Bot instalado", notInstalled: "Não instalado", expires: "Vence", noExpiry: "Sem vencimento",
  },
  "en-US": {
    title: "Servers", description: "Search installations, configurations and plans without relying on a guild administrator account.",
    search: "Guild name or ID", allStatuses: "All statuses", allPlans: "All plans", configured: "Configured", installed: "Installed", absent: "Absent", free: "Free",
    loading: "Loading servers…", empty: "No servers match these filters.", details: "Manage", previous: "Previous", next: "Next", page: "Page", of: "of",
    botActive: "Bot active", botInstalled: "Bot installed", notInstalled: "Not installed", expires: "Expires", noExpiry: "No expiry",
  },
} as const;

function formatPlan(plan: AdminGuild["plan"], language: Language) {
  if (!plan) return copy[language].free;
  return plan === "EVENTS_MARKET" ? "Events + Market" : plan === "KILLBOARD" ? "Killboard" : "Combo";
}

function formatDate(value: string | null, language: Language) {
  if (!value) return copy[language].noExpiry;
  return new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(new Date(value));
}

export function AdminGuildList({ language }: { language: Language }) {
  const t = copy[language];
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<GuildResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true); setError(null);
      const params = new URLSearchParams({ page: String(page), pageSize: "20", status, plan });
      if (query.trim()) params.set("q", query.trim());
      try {
        const response = await fetch(`/api/admin/guilds?${params}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("request_failed");
        setData(await response.json());
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") setError(language === "pt-BR" ? "Não foi possível carregar os servidores." : "Could not load servers.");
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, query ? 250 : 0);
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, [language, page, plan, query, status]);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / (data?.pageSize ?? 20)));
  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Backoffice</p><h1 className="mt-2 text-3xl font-bold text-white">{t.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{t.description}</p></div>
      <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs text-slate-400">{data?.total ?? "—"} {language === "pt-BR" ? "registros" : "records"}</span>
    </div>

    <div className="grid gap-3 rounded-2xl border border-white/8 bg-[#11131a] p-4 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
      <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/15 px-3 text-slate-400 focus-within:border-violet-400/60"><Search className="h-4 w-4" /><input value={query} onChange={(event) => updateFilter(setQuery, event.target.value)} placeholder={t.search} className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /></label>
      <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/15 px-3 text-slate-400"><SlidersHorizontal className="h-4 w-4" /><select value={status} onChange={(event) => updateFilter(setStatus, event.target.value)} className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none"><option value="all">{t.allStatuses}</option><option value="configured">{t.configured}</option><option value="installed">{t.installed}</option><option value="absent">{t.absent}</option></select></label>
      <label className="flex items-center rounded-xl border border-white/10 bg-black/15 px-3"><select value={plan} onChange={(event) => updateFilter(setPlan, event.target.value)} className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none"><option value="all">{t.allPlans}</option><option value="FREE">{t.free}</option><option value="EVENTS_MARKET">Events + Market</option><option value="KILLBOARD">Killboard</option><option value="BUNDLE">Combo</option></select></label>
    </div>

    <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#11131a]">
      {loading ? <p className="p-8 text-sm text-slate-400">{t.loading}</p> : error ? <p className="p-8 text-sm text-rose-300">{error}</p> : !data?.guilds.length ? <p className="p-8 text-sm text-slate-400">{t.empty}</p> : <>
        <div className="hidden grid-cols-[minmax(220px,1.4fr)_150px_150px_160px_110px] gap-4 border-b border-white/8 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 md:grid"><span>Guild</span><span>{language === "pt-BR" ? "Status" : "Status"}</span><span>{language === "pt-BR" ? "Plano" : "Plan"}</span><span>{language === "pt-BR" ? "Validade" : "Validity"}</span></div>
        <ul className="divide-y divide-white/6">{data.guilds.map((guild) => <li key={guild.guildId} className="grid gap-4 px-5 py-4 md:grid-cols-[minmax(220px,1.4fr)_150px_150px_160px_110px] md:items-center">
          <div className="min-w-0"><p className="truncate font-semibold text-white">{guild.guildName || (language === "pt-BR" ? "Guild sem nome" : "Unnamed guild")}</p><p className="mt-1 truncate text-xs text-slate-500">{guild.guildId}</p></div>
          <Status guild={guild} language={language} />
          <span className="text-sm text-slate-300">{formatPlan(guild.plan, language)}</span>
          <span className="text-sm text-slate-400">{guild.validUntil ? `${t.expires} ${formatDate(guild.validUntil, language)}` : t.noExpiry}</span>
          <Link href={`/admin/guilds/${guild.guildId}`} className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-violet-400/35 bg-violet-500/10 px-3 py-2 text-xs font-bold text-violet-100 transition hover:bg-violet-500/20"><ShieldCheck className="h-3.5 w-3.5" />{t.details}</Link>
        </li>)}</ul>
      </>}
    </div>
    <div className="flex items-center justify-end gap-3 text-sm text-slate-400"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1 || loading} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 disabled:opacity-40"><ChevronLeft className="h-4 w-4" />{t.previous}</button><span>{t.page} {page} {t.of} {totalPages}</span><button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages || loading} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 disabled:opacity-40">{t.next}<ChevronRight className="h-4 w-4" /></button></div>
  </div>;
}

function Status({ guild, language }: { guild: AdminGuild; language: Language }) {
  const t = copy[language];
  if (guild.configured) return <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">{t.botActive}</span>;
  if (guild.installed) return <span className="inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-100">{t.botInstalled}</span>;
  return <span className="inline-flex w-fit rounded-full border border-slate-400/20 bg-slate-400/10 px-2.5 py-1 text-xs font-semibold text-slate-300">{t.notInstalled}</span>;
}
