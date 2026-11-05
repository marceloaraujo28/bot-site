import { AdminGuildDetail } from "@/components/admin/admin-guild-detail";
import { requireBotOwner } from "@/lib/admin-auth";
import { getAdminGuildDetail } from "@/lib/admin-backoffice";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminGuildDetailPage({
  params,
}: {
  params: Promise<{ lang: string; guildId: string }>;
}) {
  const { lang, guildId } = await params;
  await requireBotOwner();
  const detail = await getAdminGuildDetail(guildId);
  if (!detail) notFound();
  return <AdminGuildDetail language={lang === "pt-BR" ? "pt-BR" : "en-US"} detail={detail} />;
}
