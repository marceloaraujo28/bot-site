"use client";

import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { Locale } from "@/config/i18n.config";
import { Activity, BadgeDollarSign, ClipboardList, LayoutDashboard, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminShellProps = {
  language: Locale;
  user: { name?: string | null; image?: string | null } | null;
  children: React.ReactNode;
};

const links = [
  { href: "/admin", icon: LayoutDashboard, key: "overview" },
  { href: "/admin/guilds", icon: Server, key: "guilds" },
  { href: "/admin/subscriptions", icon: BadgeDollarSign, key: "subscriptions" },
  { href: "/admin/sales", icon: Activity, key: "sales" },
  { href: "/admin/audit", icon: ClipboardList, key: "audit" },
  { href: "/admin/health", icon: ShieldCheck, key: "health" },
] as const;

const labels = {
  "pt-BR": {
    area: "Administração",
    overview: "Visão geral",
    guilds: "Servidores",
    subscriptions: "Assinaturas",
    sales: "Vendas",
    audit: "Auditoria",
    health: "Saúde do sistema",
    mobile: "Navegação administrativa",
  },
  "en-US": {
    area: "Administration",
    overview: "Overview",
    guilds: "Servers",
    subscriptions: "Subscriptions",
    sales: "Sales",
    audit: "Audit log",
    health: "System health",
    mobile: "Administrative navigation",
  },
} as const;

export function AdminShell({ language, user, children }: AdminShellProps) {
  const pathname = usePathname();
  const copy = labels[language];

  return (
    <main className="min-h-screen bg-[#090a0f] text-white">
      <DashboardTopbar language={language} user={user} isBotOwner />
      <div className="border-b border-amber-300/10 bg-gradient-to-r from-amber-400/10 via-orange-500/5 to-transparent px-4 py-2.5 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2 text-xs font-semibold text-amber-100/90">
          <ShieldCheck className="h-4 w-4 text-amber-300" />
          {language === "pt-BR" ? "Área restrita ao proprietário do Albion Event Bot" : "Restricted Albion Event Bot owner area"}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 border-r border-white/8 px-4 py-7 lg:block">
          <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{copy.area}</p>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
              return <Link key={link.href} href={link.href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-amber-400/12 text-amber-50" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><Icon className={`h-4 w-4 ${active ? "text-amber-300" : ""}`} />{copy[link.key]}</Link>;
            })}
          </nav>
        </aside>
        <section className="min-w-0 flex-1 px-4 py-7 sm:px-8 lg:px-12">{children}</section>
      </div>
      <nav aria-label={copy.mobile} className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-[#10121a]/95 px-2 py-2 backdrop-blur lg:hidden">
        {links.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
          return <Link key={link.href} href={link.href} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-semibold ${active ? "text-amber-200" : "text-slate-500"}`}><Icon className="h-4 w-4" /><span className="truncate">{copy[link.key]}</span></Link>;
        })}
      </nav>
    </main>
  );
}
