import { AdminShell } from "@/components/admin/admin-shell";
import { AdminAuthenticationError, requireBotOwner } from "@/lib/admin-auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let owner;
  try {
    owner = await requireBotOwner();
  } catch (error) {
    if (error instanceof AdminAuthenticationError) redirect("/login");
    notFound();
  }
  return <AdminShell language={lang === "pt-BR" ? "pt-BR" : "en-US"} user={owner.session.user}>{children}</AdminShell>;
}
