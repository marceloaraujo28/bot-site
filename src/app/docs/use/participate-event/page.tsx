import Image from "next/image";

export default function ParticipateEvent() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">🚀 Participar do Evento</h1>

      <p>
        Após o evento ser criado, ele será exibido no canal <strong className="text-white">#participar-evento</strong>{" "}
        com um <strong className="text-white">embed</strong> contendo as informações do evento atual.
      </p>

      <p>
        Para entrar na lista de participantes, basta <strong className="text-white">clicar na reação 🚀</strong> logo
        abaixo do embed.
      </p>

      <Image src="/participate-event.png" alt="Participar do Evento" quality={100} width={272} height={101} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>✅ O seu nome será adicionado automaticamente à lista de participantes do evento.</p>
        <p>📝 Você poderá ver sua participação no embed em tempo real.</p>
      </div>

      <p className="text-yellow-400 font-semibold">
        ⚠️ Atenção: É obrigatório estar conectado em um canal de voz para participar do evento.
      </p>

      <p>
        Caso você não esteja em um canal de voz, o bot não permitirá sua entrada no evento. O canal de voz ajuda o bot a
        organizar e validar a presença dos participantes de forma eficiente.
      </p>

      <p className="text-red-500 font-semibold">Para sair do evento basta apenas sair do canal de voz do evento.</p>
    </section>
  );
}
