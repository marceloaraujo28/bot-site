"use client";

import { signOutForLocale } from "@/actions/auth";
import { Locale } from "@/config/i18n.config";
import { DashboardGuild } from "@/lib/dashboard-guilds";
import { ChevronDown, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type DashboardTopbarProps = {
  language: Locale;
  user: { name?: string | null; image?: string | null } | null;
  guilds?: DashboardGuild[];
  selectedGuildId?: string;
  isBotOwner?: boolean;
};

const languageOptions = [
  { value: "pt-BR", flag: "🇧🇷", label: "Português" },
  { value: "en-US", flag: "🇺🇸", label: "English" },
] as const;

function GuildAvatar({ guild }: { guild: DashboardGuild }) {
  if (!guild.icon) {
    return <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-sm font-bold text-white">{guild.name.slice(0, 1).toUpperCase()}</span>;
  }

  return <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`} alt="" className="h-8 w-8 rounded-lg object-cover" />;
}

export function DashboardTopbar({ language, user, guilds = [], selectedGuildId, isBotOwner = false }: DashboardTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const selectedGuild = guilds.find((guild) => guild.id === selectedGuildId && guild.botConfigured);
  const currentLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[1];
  const isPortuguese = language === "pt-BR";

  async function changeLanguage(nextLocale: Locale) {
    if (nextLocale === language) {
      setIsLanguageOpen(false);
      return;
    }

    const response = await fetch("/api/locale", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });

    if (!response.ok) return;

    setIsLanguageOpen(false);
    router.replace(`${pathname || "/dashboard"}${window.location.search}${window.location.hash}`);
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0b0c12]/95 px-4 py-3 text-white backdrop-blur lg:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="hidden cursor-pointer items-center gap-2 text-sm font-bold text-slate-100 sm:flex">
            <Image src="/logo.png" alt="" width={34} height={34} className="rounded-lg" />
            Albion Event Bot
          </Link>

          {selectedGuild ? (
            <details className="group relative min-w-0">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white marker:content-none">
                <GuildAvatar guild={selectedGuild} />
                <span className="max-w-32 truncate sm:max-w-64">{selectedGuild.name}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-[calc(100%+0.65rem)] z-40 max-h-72 w-80 overflow-y-auto rounded-xl border border-white/10 bg-[#12141d] p-2 shadow-2xl">
                <Link href="/dashboard" className="mb-1 block cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold text-violet-200 hover:bg-white/5">{isPortuguese ? "Todos os servidores" : "All servers"}</Link>
                {guilds.filter((guild) => guild.botConfigured).map((guild) => (
                  <Link key={guild.id} href={`/dashboard/${guild.id}`} className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 ${guild.id === selectedGuildId ? "bg-violet-500/15 text-white" : "text-slate-300"}`}>
                    <GuildAvatar guild={guild} /><span className="truncate">{guild.name}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link href="/dashboard" className="cursor-pointer text-sm font-semibold text-slate-300 transition hover:text-white">{isPortuguese ? "Meus servidores" : "My servers"}</Link>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <div className="relative">
            <button type="button" onClick={() => setIsLanguageOpen((value) => !value)} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/6" aria-expanded={isLanguageOpen} aria-label="Change language">
              <span>{currentLanguage.flag}</span><span className="hidden sm:inline">{currentLanguage.label}</span><ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            {isLanguageOpen && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-40 rounded-xl border border-white/10 bg-[#151720] p-1.5 shadow-2xl">{languageOptions.map((option) => <button key={option.value} type="button" onClick={() => changeLanguage(option.value)} className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${option.value === language ? "bg-violet-500/15 text-white" : "text-slate-300 hover:bg-white/5"}`}><span>{option.flag}</span>{option.label}</button>)}</div>}
          </div>

          <div className="relative">
            <button type="button" onClick={() => setIsAccountOpen((value) => !value)} className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-violet-300/30 bg-violet-500/15 text-sm font-bold text-violet-100" aria-expanded={isAccountOpen} aria-label="Account menu">
              {user?.image ? <img src={user.image} alt="" className="h-full w-full object-cover" /> : user?.name?.slice(0, 1).toUpperCase() ?? "A"}
            </button>
            {isAccountOpen && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#151720] shadow-2xl"><div className="border-b border-white/8 px-4 py-3"><p className="truncate text-sm font-semibold text-white">{user?.name ?? "Discord user"}</p><p className="mt-0.5 text-xs text-slate-500">Discord</p></div><Link href="/dashboard" onClick={() => setIsAccountOpen(false)} className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"><LayoutDashboard className="h-4 w-4 text-violet-300" />{isPortuguese ? "Meus servidores" : "My servers"}</Link>{isBotOwner && <Link href="/admin" onClick={() => setIsAccountOpen(false)} className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-amber-100 transition hover:bg-amber-400/10"><ShieldCheck className="h-4 w-4 text-amber-300" />{isPortuguese ? "Administrador" : "Administrator"}</Link>}<form action={signOutForLocale}><button className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5"><LogOut className="h-4 w-4 text-slate-400" />{isPortuguese ? "Sair" : "Sign out"}</button></form></div>}
          </div>
        </div>
      </div>
    </header>
  );
}
