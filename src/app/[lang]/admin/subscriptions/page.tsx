import { AdminEmptyState } from "@/components/admin/admin-cards";
import { getAdminGuilds } from "@/lib/admin-backoffice";
import Link from "next/link";

type AdminGuild = Awaited<ReturnType<typeof getAdminGuilds>>["guilds"][number];

export default async function AdminSubscriptionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const pt = lang === "pt-BR";
  const { guilds } = await getAdminGuilds({ pageSize: 100 });
  const subscriptions = guilds.filter((guild: AdminGuild) => guild.plan);

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Billing</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{pt ? "Assinaturas" : "Subscriptions"}</h1>
        <p className="mt-2 text-sm text-slate-400">{pt ? "Assinaturas e trials ativos registrados no banco." : "Active subscriptions and trials registered in the database."}</p>
      </header>
      {subscriptions.length === 0 ? (
        <AdminEmptyState
          title={pt ? "Nenhuma assinatura ativa" : "No active subscriptions"}
          description={pt ? "Trials e planos manuais aparecerão aqui. Cobranças Stripe/Asaas serão incluídas quando os gateways forem conectados." : "Trials and manual plans will appear here. Stripe/Asaas charges will be included when gateways are connected."}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#11131a]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.035] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">{pt ? "Servidor" : "Server"}</th>
                <th className="px-5 py-4">{pt ? "Produto" : "Product"}</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">{pt ? "Validade" : "Validity"}</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((guild: AdminGuild) => (
                <tr key={guild.guildId} className="border-t border-white/6 text-slate-300">
                  <td className="px-5 py-4 font-semibold text-white"><Link className="hover:text-amber-200" href={`/admin/guilds/${guild.guildId}`}>{guild.guildName ?? guild.guildId}</Link></td>
                  <td className="px-5 py-4">{guild.plan}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-200">{guild.subscriptionStatus}</span></td>
                  <td className="px-5 py-4 text-slate-400">{guild.validUntil ? new Date(guild.validUntil).toLocaleDateString(pt ? "pt-BR" : "en-US") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
