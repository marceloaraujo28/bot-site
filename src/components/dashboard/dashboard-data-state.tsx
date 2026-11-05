import { AlertTriangle, LogIn } from "lucide-react";
import Link from "next/link";

type DashboardDataStateProps = {
  language: "pt-BR" | "en-US";
  kind: "rate-limited" | "unavailable";
};

export function DashboardDataState({ language, kind }: DashboardDataStateProps) {
  const isPortuguese = language === "pt-BR";
  const isRateLimited = kind === "rate-limited";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a0f] p-6 text-slate-200">
      <section className="max-w-lg rounded-3xl border border-amber-300/20 bg-[#11131a] p-7 shadow-2xl">
        <AlertTriangle className="h-7 w-7 text-amber-300" />
        <h1 className="mt-4 text-xl font-bold text-white">
          {isRateLimited
            ? isPortuguese ? "O Discord está limitando as consultas" : "Discord is limiting requests"
            : isPortuguese ? "Não foi possível carregar seus servidores" : "We could not load your servers"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {isRateLimited
            ? isPortuguese
              ? "Aguarde alguns instantes e atualize a página. Seus dados e configurações não foram alterados."
              : "Wait a moment and refresh the page. Your data and settings have not changed."
            : isPortuguese
              ? "Tente novamente em alguns instantes. Se o problema continuar, entre novamente com o Discord."
              : "Try again in a moment. If the problem persists, sign in with Discord again."}
        </p>
        <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-400">
          <LogIn className="h-4 w-4" />
          {isPortuguese ? "Tentar novamente" : "Try again"}
        </Link>
      </section>
    </main>
  );
}
