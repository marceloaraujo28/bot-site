import Image from "next/image";

export default function DeleteEvent() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">🛑 Cancelar Evento</h1>

      <p>
        Caso o evento precise ser encerrado por algum motivo,ele pode ser{" "}
        <strong className="text-white">cancelado</strong> a qualquer momento.
      </p>

      <p>
        Para cancelar o evento, basta reagir ao emoji <strong className="text-white">🛑</strong> no embed que foi gerado
        no canal do evento.
      </p>

      <Image src="/delete-event.png" alt="Participar do Evento" quality={100} width={272} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          📌 Somente o criador do evento ou membros com o cargo <strong>Albion Event Bot Manager</strong> podem cancelar
          o evento.
        </p>
        <p>
          🔄 Todos os participantes serão automaticamente movidos para o canal de voz{" "}
          <strong>#aguardando-conteúdo</strong>.
        </p>
        <p>🗑️ A sala de voz e a sala de texto do evento serão excluídas imediatamente após o cancelamento.</p>
      </div>

      <p>
        Essa ação é irreversível, então tenha certeza antes de cancelar o evento. Nenhum dado será registrado ou
        arquivado após o cancelamento.
      </p>
    </section>
  );
}
