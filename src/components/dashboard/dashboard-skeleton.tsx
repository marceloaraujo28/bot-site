type DashboardSkeletonKind = "servers" | "workspace" | "plans";

type DashboardSkeletonProps = {
  kind: DashboardSkeletonKind;
  language: "pt-BR" | "en-US";
};

function Placeholder({ className }: { className: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-xl bg-white/[0.07] ${className}`} />;
}

function LoadingLabel({ language, kind }: DashboardSkeletonProps) {
  const isPortuguese = language === "pt-BR";
  const label =
    kind === "servers"
      ? isPortuguese
        ? "Carregando seus servidores..."
        : "Loading your servers..."
      : isPortuguese
        ? "Validando permissões e carregando dados da guild..."
        : "Validating permissions and loading guild data...";

  return (
    <p className="mt-5 text-sm text-slate-400" role="status">
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
      <span aria-hidden="true">{label}</span>
    </p>
  );
}

function WorkspaceFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#090a0f] text-white" aria-busy="true">
      <header className="border-b border-white/8 bg-[#0b0c12] px-4 py-3 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <Placeholder className="h-8 w-8" />
            <Placeholder className="h-4 w-28" />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2">
            <Placeholder className="h-8 w-8" />
            <Placeholder className="h-4 w-32" />
          </div>
          <Placeholder className="h-4 w-20" />
        </div>
      </header>
      <div className="border-b border-violet-300/15 bg-violet-500/10 px-4 py-3 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <Placeholder className="h-4 w-72 max-w-[70%]" />
          <Placeholder className="h-8 w-24" />
        </div>
      </div>
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden w-60 shrink-0 border-r border-white/8 px-4 py-7 lg:block">
          <Placeholder className="mb-5 h-3 w-16" />
          <Placeholder className="h-11 w-full" />
          <Placeholder className="mt-2 h-11 w-full" />
        </aside>
        <section className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">{children}</section>
      </div>
    </main>
  );
}

function ServersSkeleton({ language }: Pick<DashboardSkeletonProps, "language">) {
  return (
    <main className="min-h-screen bg-[#090a0f] px-4 py-10 text-white sm:px-8 lg:px-12" aria-busy="true">
      <section className="mx-auto max-w-[1450px] rounded-3xl border border-white/8 bg-[#11131a] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:px-9 sm:py-10">
        <Placeholder className="h-3 w-32" />
        <Placeholder className="mt-4 h-10 w-64 max-w-full" />
        <Placeholder className="mt-4 h-4 w-full max-w-2xl" />
        <LoadingLabel language={language} kind="servers" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
              <div className="flex items-center gap-3">
                <Placeholder className="h-12 w-12 rounded-2xl" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Placeholder className="h-4 w-3/4" />
                  <Placeholder className="h-3 w-1/2" />
                </div>
              </div>
              <Placeholder className="mt-5 h-9 w-full" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function OverviewSkeleton({ language }: Pick<DashboardSkeletonProps, "language">) {
  return (
    <WorkspaceFrame>
      <Placeholder className="h-3 w-24" />
      <Placeholder className="mt-4 h-10 w-3/4 max-w-xl" />
      <Placeholder className="mt-4 h-4 w-full max-w-2xl" />
      <LoadingLabel language={language} kind="workspace" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <Placeholder className="h-3 w-24" />
            <Placeholder className="mt-4 h-7 w-3/5" />
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-violet-300/20 bg-[#131526] p-8">
        <Placeholder className="h-3 w-28" />
        <Placeholder className="mt-4 h-8 w-80 max-w-full" />
        <Placeholder className="mt-4 h-4 w-full max-w-xl" />
        <Placeholder className="mt-6 h-10 w-36" />
      </div>
    </WorkspaceFrame>
  );
}

function PlansSkeleton({ language }: Pick<DashboardSkeletonProps, "language">) {
  return (
    <WorkspaceFrame>
      <Placeholder className="h-3 w-16" />
      <Placeholder className="mt-4 h-10 w-3/4 max-w-xl" />
      <LoadingLabel language={language} kind="plans" />
      <div className="mt-9 grid gap-5 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="min-h-[360px] rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <Placeholder className="h-6 w-24 rounded-full" />
            <div className="mt-28">
              <Placeholder className="h-4 w-16" />
              <Placeholder className="mt-3 h-9 w-32" />
              <Placeholder className="mt-6 h-8 w-28" />
              <Placeholder className="mt-7 h-3 w-full" />
              <Placeholder className="mt-3 h-3 w-4/5" />
              <Placeholder className="mt-6 h-11 w-full" />
            </div>
          </div>
        ))}
      </div>
    </WorkspaceFrame>
  );
}

export function DashboardSkeleton({ kind, language }: DashboardSkeletonProps) {
  if (kind === "servers") return <ServersSkeleton language={language} />;
  if (kind === "plans") return <PlansSkeleton language={language} />;
  return <OverviewSkeleton language={language} />;
}

export function DashboardContentSkeleton({ kind, language }: DashboardSkeletonProps) {
  if (kind === "plans") {
    return <div aria-busy="true">
      <Placeholder className="h-3 w-16" />
      <Placeholder className="mt-4 h-10 w-3/4 max-w-xl" />
      <LoadingLabel language={language} kind="plans" />
      <div className="mt-9 grid gap-5 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => <div key={index} className="min-h-[360px] rounded-3xl border border-white/10 bg-white/[0.025] p-6"><Placeholder className="h-6 w-24 rounded-full" /><div className="mt-28"><Placeholder className="h-4 w-16" /><Placeholder className="mt-3 h-9 w-32" /><Placeholder className="mt-6 h-8 w-28" /><Placeholder className="mt-7 h-3 w-full" /><Placeholder className="mt-3 h-3 w-4/5" /><Placeholder className="mt-6 h-11 w-full" /></div></div>)}
      </div>
    </div>;
  }

  return <div aria-busy="true">
    <Placeholder className="h-3 w-24" />
    <Placeholder className="mt-4 h-10 w-3/4 max-w-xl" />
    <Placeholder className="mt-4 h-4 w-full max-w-2xl" />
    <LoadingLabel language={language} kind="workspace" />
    <div className="mt-8 grid gap-4 md:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><Placeholder className="h-3 w-24" /><Placeholder className="mt-4 h-7 w-3/5" /></div>)}</div>
    <div className="mt-8 rounded-3xl border border-violet-300/20 bg-[#131526] p-8"><Placeholder className="h-3 w-28" /><Placeholder className="mt-4 h-8 w-80 max-w-full" /><Placeholder className="mt-4 h-4 w-full max-w-xl" /><Placeholder className="mt-6 h-10 w-36" /></div>
  </div>;
}
