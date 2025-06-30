export default function ChannelsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">📢 Canais</h1>
        <p className="text-muted-foreground text-sm max-w-prose">
          O bot cria automaticamente os canais e categorias necessários após o comando{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">/setup</code>. Abaixo estão os canais e suas funções.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Canais de Texto e Voz</h2>
          <div className="space-y-4">
            {[
              {
                name: "📍・criar-evento",
                desc: "Canal onde aparece o embed de criação de evento e também onde o botão para iniciar um novo evento é exibido para interação.",
              },
              {
                name: "🎮・participar-evento",
                desc: "Onde o bot publica os eventos criados e os botões para administração do evento(participar, iniciar, excluir, finalizar).",
              },
              {
                name: "💰・financeiro",
                desc: "Transações da guild e notificações do bot aparecem aqui.",
              },
              {
                name: "📊・verificar-saldo",
                desc: "Canal para membros consultarem saldos individuais e da guild.",
              },
              {
                name: "📄・logs",
                desc: "Erros, avisos e tentativas inválidas são mostradas aqui.",
              },
              {
                name: "🎙️・aguardando conteúdo",
                desc: "Sala de voz onde os jogadores aguardam eventos ou conversam.",
              },
            ].map((channel, index) => (
              <ChannelCard key={index} name={channel.name} description={channel.desc} />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Categorias</h2>
          <div className="space-y-4">
            <ChannelCard
              name="📂 Eventos Iniciados"
              description="Categoria onde o bot cria as salas de voz para eventos em andamento."
            />
            <ChannelCard
              name="📦 Eventos Finalizados"
              description="Categoria onde as salas de eventos são movidas após o encerramento."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-l-2 border-gray-600 pl-4">
      <p className="font-medium text-gray-100">{name}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
