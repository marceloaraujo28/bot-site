export default function Language() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">🌐 Mudar Idioma</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Idioma Geral do Servidor</h2>
          <p>
            Para mudar o idioma principal do bot em todo o servidor, utilize o comando{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">/lang</code>. Esse comando define o idioma das
            mensagens globais.
          </p>
          <p>
            <strong>Requisito:</strong> apenas usuários com permissão de{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">Administrador</code> podem utilizar este comando.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Idioma do Mercado (Usuário)</h2>
          <p>
            Para mudar o idioma apenas das mensagens relacionadas ao sistema de preços do mercado, use{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-sm">/price-lang</code>. Essa mudança é pessoal e só
            afeta o usuário que executa o comando.
          </p>
          <p>
            <strong>Disponível para:</strong> todos os membros do servidor.
          </p>
        </div>
      </div>
    </section>
  );
}
