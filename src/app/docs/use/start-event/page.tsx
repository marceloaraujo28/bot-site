import Image from "next/image";

export default function ComecarEvento() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">🏁 Começar o Evento</h1>

      <p>
        Após todos os participantes entrarem no evento, é hora de{" "}
        <strong className="text-white">iniciar o evento</strong>. Esse passo começa oficialmente a contagem de tempo
        para cada jogador.
      </p>

      <p>
        Para começar o evento, basta <strong className="text-white">reagir ao emoji 🏁</strong> no embed que foi gerado
        no canal <strong className="text-white">#participar-evento</strong>.
      </p>

      <Image src="/start-event.png" alt="Participar do Evento" quality={100} width={272} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          📌 Somente o criador do evento ou membros com o cargo <strong>Albion Event Bot Manager</strong> podem iniciar
          o evento.
        </p>
        <p>⏱️ Após iniciar, o tempo dos participantes começa a ser contado automaticamente.</p>
      </div>

      <p>
        Lembrando que o participante pode sair do evento a qualquer momento e voltar quando quiser — o tempo de
        participação é contabilizado apenas enquanto ele estiver ativo no evento.
      </p>
    </section>
  );
}
