import { DashboardGuild } from "@/lib/dashboard-guilds";
import { Crown, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

type GuildListProps = {
  language: "pt-BR" | "en-US";
  guilds: DashboardGuild[];
};

function GuildAvatar({ guild }: { guild: DashboardGuild }) {
  if (!guild.icon) {
    return <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7058dc] to-[#c34cd8] text-xl font-bold text-white">{guild.name.slice(0, 1).toUpperCase()}</div>;
  }

  return <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`} alt="" className="h-14 w-14 shrink-0 rounded-2xl border border-white/10 object-cover" />;
}

export function GuildList({ language, guilds }: GuildListProps) {
  const isPortuguese = language === "pt-BR";

  if (guilds.length === 0) {
    return <Notice tone="slate" text={isPortuguese ? "Nenhum servidor em que você seja dono ou Administrador foi encontrado." : "No server where you are an owner or Administrator was found."} />;
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">{isPortuguese ? "Servidores" : "Servers"}</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{isPortuguese ? "Escolha uma guild para continuar" : "Choose a guild to continue"}</h2>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs text-slate-400 sm:block">{guilds.length} {isPortuguese ? "autorizado(s)" : "authorized"}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {guilds.map((guild) => (
          <article key={guild.id} className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-[#11131a] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-violet-400/45">
            <div className="flex items-start gap-4"><GuildAvatar guild={guild} /><div className="min-w-0 flex-1"><p className="truncate font-semibold text-white">{guild.name}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">{guild.isOwner ? <Crown className="h-3.5 w-3.5 text-amber-300" /> : <ShieldCheck className="h-3.5 w-3.5 text-sky-300" />}{guild.isOwner ? (isPortuguese ? "Dono do servidor" : "Server owner") : isPortuguese ? "Administrador" : "Administrator"}</p></div></div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/7 pt-4">
              {guild.botConfigured ? <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{isPortuguese ? "Bot ativo" : "Bot active"}</span> : guild.botInstalled ? <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-200"><Sparkles className="h-3.5 w-3.5 text-amber-300" />{isPortuguese ? "Bot instalado" : "Bot installed"}</span> : <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400"><Sparkles className="h-3.5 w-3.5 text-violet-300" />{isPortuguese ? "Pronto para instalar" : "Ready to install"}</span>}
              {guild.botConfigured ? <Link href={`/dashboard/${guild.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-400">{isPortuguese ? "Abrir painel" : "Open dashboard"}</Link> : guild.botInstalled ? <span className="max-w-[12rem] text-right text-xs leading-5 text-amber-100/80">{isPortuguese ? "Use /setup ou /killboard-setup no Discord" : "Use /setup or /killboard-setup in Discord"}</span> : guild.installUrl ? <a href={guild.installUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/35 bg-sky-400/10 px-3 py-2 text-xs font-bold text-sky-200 transition hover:bg-sky-400/20">{isPortuguese ? "Instalar bot" : "Install bot"}<ExternalLink className="h-3.5 w-3.5" /></a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Notice({ tone, text }: { tone: "amber" | "red" | "slate"; text: string }) {
  const toneClass = { amber: "border-amber-400/25 bg-amber-400/8 text-amber-100", red: "border-red-400/25 bg-red-400/8 text-red-100", slate: "border-white/10 bg-white/[0.03] text-slate-300" }[tone];
  return <p className={`mt-10 rounded-2xl border p-5 ${toneClass}`}>{text}</p>;
}
