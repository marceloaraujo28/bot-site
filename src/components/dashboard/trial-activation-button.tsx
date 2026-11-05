"use client";

import { LoaderCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TrialActivationButtonProps = {
  guildId: string;
  language: "pt-BR" | "en-US";
  compact?: boolean;
  onResult?: (result: "activated" | "already_used" | "paid_subscription" | "error") => void;
};

export function TrialActivationButton({
  guildId,
  language,
  compact = false,
  onResult,
}: TrialActivationButtonProps) {
  const router = useRouter();
  const [isActivating, setIsActivating] = useState(false);
  const isPortuguese = language === "pt-BR";

  async function activateTrial() {
    setIsActivating(true);
    try {
      const response = await fetch(`/api/dashboard/guilds/${guildId}/trial`, { method: "POST" });
      const data = (await response.json().catch(() => null)) as {
        activated?: boolean;
        reason?: "already_used" | "paid_subscription";
      } | null;

      if (!response.ok) throw new Error("Trial activation failed");
      if (data?.activated) {
        onResult?.("activated");
        router.refresh();
      } else {
        onResult?.(data?.reason ?? "already_used");
      }
    } catch {
      onResult?.("error");
    } finally {
      setIsActivating(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isActivating}
      onClick={activateTrial}
      className={compact
        ? "rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#24203d] transition hover:bg-violet-100 disabled:cursor-wait disabled:opacity-70"
        : "inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-400 disabled:cursor-wait disabled:opacity-70"}
    >
      {isActivating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      {isActivating
        ? isPortuguese ? "Ativando..." : "Activating..."
        : isPortuguese ? "Ativar 7 dias grátis" : "Activate 7 free days"}
    </button>
  );
}
