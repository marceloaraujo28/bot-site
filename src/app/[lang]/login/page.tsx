import { auth, signIn } from "@/auth";
import { Locale } from "@/config/i18n.config";
import { redirect } from "next/navigation";

export default async function LoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const session = await auth();
  const isPortuguese = lang === "pt-BR";

  if (session?.user) {
    redirect("/dashboard");
  }

  async function loginWithDiscord() {
    "use server";

    await signIn("discord", { redirectTo: "/dashboard" });
  }

  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-xl items-center px-6 py-16">
      <section className="w-full rounded-2xl border border-[#332f5d] bg-[#221f41] p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold text-white">{isPortuguese ? "Acesse o painel" : "Access your dashboard"}</h1>
        <p className="mt-4 text-gray-300">
          {isPortuguese
            ? "Entre com sua conta Discord para administrar os serviços das suas guilds."
            : "Sign in with your Discord account to manage your guild services."}
        </p>
        <form action={loginWithDiscord} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#5865F2] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-[#9ca5ff] focus:ring-offset-2 focus:ring-offset-[#221f41]"
          >
            {isPortuguese ? "Entrar com Discord" : "Continue with Discord"}
          </button>
        </form>
      </section>
    </main>
  );
}
