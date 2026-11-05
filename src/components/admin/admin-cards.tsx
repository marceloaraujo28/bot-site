import { LucideIcon } from "lucide-react";

export function AdminMetricCard({ label, value, detail, icon: Icon, tone = "violet" }: { label: string; value: number | string; detail?: string; icon: LucideIcon; tone?: "violet" | "amber" | "emerald" | "rose" }) {
  const tones = {
    violet: "border-violet-300/15 bg-violet-500/8 text-violet-200",
    amber: "border-amber-300/15 bg-amber-400/8 text-amber-200",
    emerald: "border-emerald-300/15 bg-emerald-400/8 text-emerald-200",
    rose: "border-rose-300/15 bg-rose-400/8 text-rose-200",
  };
  return <article className="rounded-2xl border border-white/8 bg-[#11131a] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>{detail && <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>}</div><span className={`rounded-xl border p-2.5 ${tones[tone]}`}><Icon className="h-5 w-5" /></span></div></article>;
}

export function AdminEmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.018] p-8 text-center"><p className="text-base font-semibold text-white">{title}</p><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">{description}</p></div>;
}
