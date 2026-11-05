"use client";

import { DashboardGuildProvider, DashboardLanguage } from "@/components/dashboard/dashboard-guild-context";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { TrialActivationButton } from "@/components/dashboard/trial-activation-button";
import { DashboardGuild } from "@/lib/dashboard-guilds";
import { DashboardBillingState } from "@/lib/billing";
import { BarChart3, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardGuildShellProps = {
  guild: DashboardGuild;
  guilds: DashboardGuild[];
  language: DashboardLanguage;
  user: { name?: string | null; image?: string | null } | null;
  billing: DashboardBillingState;
  isBotOwner?: boolean;
  children: React.ReactNode;
};

export function DashboardGuildShell({ guild, guilds, language, user, billing, children, isBotOwner = false }: DashboardGuildShellProps) {
  const pathname = usePathname();
  const isPortuguese = language === "pt-BR";
  const overviewHref = `/dashboard/${guild.id}`;
  const plansHref = `${overviewHref}/plans`;
  const isPlans = pathname?.endsWith("/plans") ?? false;
  const hasPremium = billing.plan !== "FREE";

  return (
    <DashboardGuildProvider value={{ guild, language, billing }}>
      <main className="min-h-screen bg-[#090a0f] text-white">
        <DashboardTopbar language={language} user={user} guilds={guilds} selectedGuildId={guild.id} isBotOwner={isBotOwner} />
        {isPlans && <div className="border-b border-violet-300/15 bg-gradient-to-r from-violet-600/25 via-fuchsia-500/15 to-amber-400/15 px-4 py-3 lg:px-8">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-violet-50">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>{billing.isTrial
                ? (isPortuguese ? "Seu teste premium está ativo." : "Your premium trial is active.")
                : (isPortuguese ? "Experimente os recursos premium de Eventos e Killboard por 7 dias." : "Try premium Events and Killboard features free for 7 days.")}</span>
            </div>
            {!hasPremium && !billing.trialUsed && (
              <TrialActivationButton guildId={guild.id} language={language} compact />
            )}
          </div>
        </div>}
        <div className="mx-auto flex max-w-[1500px]">
          <aside className="hidden w-60 shrink-0 border-r border-white/8 px-4 py-7 lg:block">
            <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{isPortuguese ? "Painel" : "Dashboard"}</p>
            <nav className="space-y-1">
              <SidebarLink href={overviewHref} active={!isPlans} icon={<LayoutDashboard className="h-4 w-4" />} label={isPortuguese ? "Visão geral" : "Overview"} />
              <SidebarLink href={plansHref} active={isPlans} icon={<BarChart3 className="h-4 w-4" />} label={isPortuguese ? "Planos" : "Plans"} />
            </nav>
          </aside>
          <section className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
            <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 lg:hidden">
              <Link href={overviewHref} className={!isPlans ? "text-violet-200" : "hover:text-white"}>{isPortuguese ? "Visão geral" : "Overview"}</Link>
              <span>•</span>
              <Link href={plansHref} className={isPlans ? "text-violet-200" : "hover:text-white"}>{isPortuguese ? "Planos" : "Plans"}</Link>
            </div>
            {children}
          </section>
        </div>
      </main>
    </DashboardGuildProvider>
  );
}

function SidebarLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-violet-500/15 text-violet-100" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
      {icon}{label}
    </Link>
  );
}
