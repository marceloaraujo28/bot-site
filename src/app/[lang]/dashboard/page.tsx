import { auth } from "@/auth";
import { GuildList } from "@/components/dashboard/guild-list";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { DashboardDataState } from "@/components/dashboard/dashboard-data-state";
import { Locale } from "@/config/i18n.config";
import { DiscordGuildFetchError, getDashboardGuildsForServerComponent } from "@/lib/dashboard-guilds";
import { isCurrentUserBotOwner } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const session = await auth();
  const isBotOwner = await isCurrentUserBotOwner();
  const isPortuguese = lang === "pt-BR";

  if (!session?.user) {
    redirect("/login");
  }

  let guilds;

  try {
    guilds = await getDashboardGuildsForServerComponent();
  } catch (error) {
    if (error instanceof DiscordGuildFetchError) {
      return <DashboardDataState language={isPortuguese ? "pt-BR" : "en-US"} kind={error.status === 429 ? "rate-limited" : "unavailable"} />;
    }

    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#090a0f] text-white">
      <DashboardTopbar language={isPortuguese ? "pt-BR" : "en-US"} user={session.user} isBotOwner={isBotOwner} />
      <section className="mx-auto max-w-[1450px] px-4 py-10 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#11131a] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:px-9 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(121,83,235,0.23),transparent_28%),radial-gradient(circle_at_5%_100%,rgba(40,196,164,0.12),transparent_30%)]" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Albion Event Bot</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {isPortuguese ? "Seus servidores" : "Your servers"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              {isPortuguese
                ? `Olá${session.user.name ? `, ${session.user.name}` : ""}. Aqui estão apenas os servidores onde você é dono ou Administrador.`
                : `Hello${session.user.name ? `, ${session.user.name}` : ""}. Here are only the servers where you are an owner or Administrator.`}
            </p>
            <GuildList language={isPortuguese ? "pt-BR" : "en-US"} guilds={guilds} />
          </div>
        </div>
      </section>
    </main>
  );
}
