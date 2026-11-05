import { AdminEmptyState } from "@/components/admin/admin-cards";
import { getAdminRecentAuditLogs } from "@/lib/admin-backoffice";

type AdminAuditEntry = Awaited<ReturnType<typeof getAdminRecentAuditLogs>>[number];

export default async function AdminAuditPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const pt = lang === "pt-BR";
  const entries = await getAdminRecentAuditLogs();

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{pt ? "Segurança" : "Security"}</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{pt ? "Auditoria" : "Audit log"}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {pt
            ? "Todas as alterações manuais de planos ficam registradas com autor, motivo e estado anterior/posterior."
            : "All manual plan changes are recorded with actor, reason and before/after state."}
        </p>
      </header>
      {entries.length === 0 ? (
        <AdminEmptyState
          title={pt ? "Nenhuma ação administrativa registrada" : "No administrative actions recorded"}
          description={pt ? "Concessões, extensões, trocas e revogações manuais aparecerão aqui." : "Manual grants, extensions, changes and revocations will appear here."}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#11131a]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.035] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">{pt ? "Quando" : "When"}</th>
                <th className="px-5 py-4">{pt ? "Ação" : "Action"}</th>
                <th className="px-5 py-4">{pt ? "Servidor" : "Server"}</th>
                <th className="px-5 py-4">{pt ? "Motivo" : "Reason"}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry: AdminAuditEntry, index: number) => (
                <tr key={`${entry.createdAt}-${index}`} className="border-t border-white/6 text-slate-300">
                  <td className="whitespace-nowrap px-5 py-4 text-slate-400">{new Date(entry.createdAt).toLocaleString(pt ? "pt-BR" : "en-US")}</td>
                  <td className="px-5 py-4 font-semibold text-amber-100">{entry.action}</td>
                  <td className="px-5 py-4 font-mono text-xs">{entry.targetGuildId ?? "—"}</td>
                  <td className="max-w-md px-5 py-4 text-slate-400">{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
