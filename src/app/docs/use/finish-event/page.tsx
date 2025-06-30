import Image from "next/image";

export default function FinishedEvent() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">⏸ Finalizar Evento</h1>

      <p>
        Após o evento ter sido iniciado, o emoji <strong className="text-white">⏸</strong> ficará disponível no embed do
        canal do evento. Apenas o criador do evento ou usuários com o cargo{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">Albion Event Manager</code> poderão finalizar o evento.
      </p>

      <p>
        Para finalizar, basta reagir ao emoji <strong className="text-white">⏸</strong>. Isso encerrará oficialmente o
        evento.
      </p>

      <Image src="/finish-event.png" alt="Participar do Evento" quality={100} width={230} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          📌 Somente o criador do evento ou membros com o cargo <strong>Albion Event Bot Manager</strong> podem
          finalizar o evento.
        </p>
        <p>
          🎯 Todos os participantes serão automaticamente movidos para o canal de voz{" "}
          <strong>#aguardando-conteúdo</strong>.
        </p>
        <p>
          📁 Um novo canal de texto será criado com o nome do evento, dentro da categoria{" "}
          <strong>Eventos Finalizados</strong>.
        </p>
        <p>
          📊 Nesse canal, será exibido um embed com instruções e ferramentas para{" "}
          <strong>simular a divisão dos lucros</strong> entre os participantes.
        </p>
      </div>

      <p>
        Esse processo garante que os dados do evento fiquem registrados e disponíveis para consulta e finalização dos
        pagamentos.
      </p>
    </section>
  );
}
