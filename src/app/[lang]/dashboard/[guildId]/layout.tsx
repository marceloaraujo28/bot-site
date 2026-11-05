import { auth } from "@/auth";
import { DashboardGuildShell } from "@/components/dashboard/dashboard-guild-shell";
import { DashboardDataState } from "@/components/dashboard/dashboard-data-state";
import { DiscordGuildFetchError, getDashboardGuildsForServerComponent } from "@/lib/dashboard-guilds";
import { getDashboardBillingState } from "@/lib/billing";
import { isCurrentUserBotOwner } from "@/lib/admin-auth";
import { notFound, redirect } from "next/navigation";

export default async function GuildDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; guildId: string }>;
}) {
  const { lang, guildId } = await params;
  const language = lang === "pt-BR" ? "pt-BR" : "en-US";
  const session = await auth();
  const isBotOwner = await isCurrentUserBotOwner();

  if (!session?.user) redirect("/login");

  let guilds;
  try {
    guilds = await getDashboardGuildsForServerComponent();
  } catch (error) {
    if (error instanceof DiscordGuildFetchError) {
      return <DashboardDataState language={language} kind={error.status === 429 ? "rate-limited" : "unavailable"} />;
    }

    redirect("/login");
  }

  const guild = guilds.find((candidate) => candidate.id === guildId && candidate.botConfigured);
  if (!guild) notFound();

  const billing = await getDashboardBillingState(guild.id);

  return <DashboardGuildShell guild={guild} guilds={guilds} language={language} user={session.user} billing={billing} isBotOwner={isBotOwner}>{children}</DashboardGuildShell>;
}
