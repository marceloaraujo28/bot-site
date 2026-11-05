"use client";

import { DashboardGuild } from "@/lib/dashboard-guilds";
import { DashboardBillingState } from "@/lib/billing";
import { createContext, useContext } from "react";

export type DashboardLanguage = "pt-BR" | "en-US";

type DashboardGuildContextValue = {
  guild: DashboardGuild;
  language: DashboardLanguage;
  billing: DashboardBillingState;
};

const DashboardGuildContext = createContext<DashboardGuildContextValue | null>(null);

export function DashboardGuildProvider({
  value,
  children,
}: {
  value: DashboardGuildContextValue;
  children: React.ReactNode;
}) {
  return <DashboardGuildContext.Provider value={value}>{children}</DashboardGuildContext.Provider>;
}

export function useDashboardGuild() {
  const context = useContext(DashboardGuildContext);

  if (!context) {
    throw new Error("useDashboardGuild must be used inside DashboardGuildProvider");
  }

  return context;
}
