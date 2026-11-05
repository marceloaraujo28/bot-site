export default function AdminLoading() {
  return <div aria-busy="true" className="space-y-6 animate-pulse"><div className="h-10 w-72 rounded-xl bg-white/8" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-36 rounded-2xl bg-white/[0.05]" />)}</div><div className="h-80 rounded-2xl bg-white/[0.04]" /></div>;
}
