"use client";

import { signOutForLocale } from "@/actions/auth";
import { Locale } from "@/config/i18n.config";
import { getDictionaryClient } from "@/dictionaries/client";
import { ChevronDown, LayoutDashboard, LogIn, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type NavbarProps = {
  lang: Locale;
  user: { name?: string | null; image?: string | null } | null;
  isBotOwner?: boolean;
};

const languageOptions = [
  { value: "pt-BR", flag: "🇧🇷", label: "Português" },
  { value: "en-US", flag: "🇺🇸", label: "English" },
] as const;

export function Navbar({ lang, user, isBotOwner = false }: NavbarProps) {
  const t = getDictionaryClient(lang);
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const currentLanguage = languageOptions.find((option) => option.value === lang) ?? languageOptions[0];

  async function changeLanguage(nextLocale: Locale) {
    if (nextLocale === lang) {
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
    router.replace(`${pathname || "/"}${window.location.search}${window.location.hash}`);
    router.refresh();
  }

  const navLinks = [
    { href: "/", label: t.navBar.home },
    { href: "/docs", label: t.navBar.docs },
    { href: "https://discord.gg/AjGZbc5b2s", label: t.navBar.support, external: true },
  ];

  return (
    <nav className="border-b border-white/10 bg-[#201d3c] text-white shadow-[0_10px_35px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex cursor-pointer shrink-0 items-center gap-2" aria-label="Albion Event Bot home">
          <Image src="/logo.png" alt="" width={34} height={34} className="rounded-lg" />
          <span className="hidden text-sm font-bold sm:block">Albion Event Bot</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => link.external ? <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="cursor-pointer text-sm font-semibold text-slate-300 transition hover:text-white">{link.label}</a> : <Link key={link.href} href={link.href} className="cursor-pointer text-sm font-semibold text-slate-300 transition hover:text-white">{link.label}</Link>)}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button type="button" onClick={() => setIsLanguageOpen((value) => !value)} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/6" aria-expanded={isLanguageOpen} aria-label="Change language">
              <span>{currentLanguage.flag}</span><span className="hidden sm:inline">{currentLanguage.label}</span><ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            {isLanguageOpen && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-40 rounded-xl border border-white/10 bg-[#151720] p-1.5 shadow-2xl">{languageOptions.map((option) => <button key={option.value} type="button" onClick={() => changeLanguage(option.value)} className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${option.value === lang ? "bg-violet-500/15 text-white" : "text-slate-300 hover:bg-white/5"}`}><span>{option.flag}</span>{option.label}</button>)}</div>}
          </div>

          {user ? <div className="relative"><button type="button" onClick={() => setIsAccountOpen((value) => !value)} className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-violet-300/30 bg-violet-500/15 text-sm font-bold text-violet-100" aria-expanded={isAccountOpen} aria-label="Account menu">{user.image ? <img src={user.image} alt="" className="h-full w-full object-cover" /> : user.name?.slice(0, 1).toUpperCase() ?? "A"}</button>{isAccountOpen && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#151720] shadow-2xl"><div className="border-b border-white/8 px-4 py-3"><p className="truncate text-sm font-semibold text-white">{user.name ?? "Discord user"}</p><p className="mt-0.5 text-xs text-slate-500">Discord</p></div><Link href="/dashboard" onClick={() => setIsAccountOpen(false)} className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"><LayoutDashboard className="h-4 w-4 text-violet-300" />{lang === "pt-BR" ? "Meus servidores" : "My servers"}</Link>{isBotOwner && <Link href="/admin" onClick={() => setIsAccountOpen(false)} className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-amber-100 transition hover:bg-amber-400/10"><ShieldCheck className="h-4 w-4 text-amber-300" />{lang === "pt-BR" ? "Administrador" : "Administrator"}</Link>}<form action={signOutForLocale}><button className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5"><LogOut className="h-4 w-4 text-slate-400" />{lang === "pt-BR" ? "Sair" : "Sign out"}</button></form></div>}</div> : <Link href="/login" className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-violet-300/30 bg-violet-500/12 px-3 py-2 text-xs font-bold text-violet-100 transition hover:bg-violet-500/25"><LogIn className="h-3.5 w-3.5" />{lang === "pt-BR" ? "Entrar" : "Sign in"}</Link>}

          <button className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/6 lg:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu">{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {isOpen && <div className="border-t border-white/8 px-4 py-4 lg:hidden"><div className="flex flex-col gap-1">{navLinks.map((link) => link.external ? <a key={link.href} href={link.href} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5">{link.label}</a> : <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5">{link.label}</Link>)}</div></div>}
    </nav>
  );
}

export default Navbar;
