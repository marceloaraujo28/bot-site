import Link from "next/link";

export default function SetupPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">✨ Setup Eventos</h1>

      <p>
        Para configurar o bot de eventos, use o comando{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">/setup</code> e escolha o seu idioma. Ele criará
        automaticamente os{" "}
        <Link href="/docs/channels" className="text-blue-700 hover:underline">
          canais
        </Link>{" "}
        e permissões necessários para o funcionamento dos eventos. Atualmente o bot tem suporte para os seguintes
        idiomas: <code className="bg-gray-800 px-2 py-1 rounded text-sm">Português</code> e{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">inglês</code>
      </p>

      <h2 className="text-xl font-semibold mt-6">
        ⚙️ O que o <code>/setup</code> faz?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Cria canais de texto organizados para a operação do bot.</li>
        <li>Define permissões padrão para os canais criados.</li>
        <li>Cria automaticamente um cargo especial para gerenciar eventos.</li>
      </ul>

      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold text-purple-300 mb-1">🎖️ Cargo Criado</h3>
        <p className="text-gray-300">
          O comando <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">/setup</code> criará o seguinte cargo no
          seu servidor:
        </p>

        <div className="bg-purple-900/20 border-l-4 border-purple-500 mt-4 p-3 rounded">
          <p className="text-purple-300 font-semibold">Albion Event Bot Manager</p>
          <p className="text-sm text-gray-400">
            Usuários com esse cargo terão acesso total às funções de gerenciamento de eventos.
          </p>
        </div>
      </div>

      <div className="p-4 bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
        <p className="text-yellow-300 font-semibold">⚠️ Importante:</p>
        <p>
          Não modifique manualmente os canais e cargos criados pelo setup, para evitar conflitos com os comandos do bot.
        </p>
      </div>
    </section>
  );
}
