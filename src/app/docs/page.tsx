import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentação - Albion Event Bot",
  description: "Bot para Split Loot e Consultar preços do mercado em Albion Online",
};

export default function Documentation() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">📥 Instalação do Bot</h1>

      <p>Para adicionar o bot ao seu servidor do Discord, siga os passos abaixo. O processo é rápido e seguro.</p>

      <ol className="list-decimal list-inside space-y-2 text-gray-300">
        <li>
          <span>Clique no link de convite: </span>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1272188978765893714&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Convidar o Bot
          </a>
        </li>
        <li>Escolha o servidor onde deseja instalar o bot.</li>
        <li>Aceite as permissões solicitadas pelo bot.</li>
        <li>
          Clique em <strong>“Autorizar”</strong>.
        </li>
      </ol>

      <div className="p-4 bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
        <p className="text-yellow-300 font-semibold">⚠️ Atenção:</p>
        <p>
          Certifique-se de estar conectado com uma conta que tenha permissões de <strong>Administrador</strong> no
          servidor. Caso contrário, o bot não poderá ser adicionado corretamente.
        </p>
      </div>
    </section>
  );
}
