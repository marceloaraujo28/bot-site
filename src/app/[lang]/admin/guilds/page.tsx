import { AdminGuildList } from "@/components/admin/admin-guild-list";
import { requireBotOwner } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminGuildsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await requireBotOwner();
  return <AdminGuildList language={lang === "pt-BR" ? "pt-BR" : "en-US"} />;
}
