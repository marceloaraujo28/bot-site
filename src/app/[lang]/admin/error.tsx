"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <div className="rounded-2xl border border-rose-300/15 bg-rose-400/5 p-8 text-center"><h2 className="text-lg font-bold text-white">Unable to load the backoffice</h2><p className="mt-2 text-sm text-slate-400">Try again. Sensitive data was not exposed.</p><button onClick={reset} className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900">Try again</button></div>;
}
