import Image from "next/image";
import Link from "next/link";

export default function CreateEvent() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">⚔️ Criar Evento</h1>

      <p>
        Para iniciar um evento, acesse o canal <strong className="text-white">#criar-evento</strong> que foi
        automaticamente criado pelo bot durante o <code className="bg-gray-800 px-2 py-1 rounded text-sm">/setup</code>.
        Nesse canal, haverá um <strong className="text-white">embed</strong> com as informações do evento e um botão
        para criá-lo.
      </p>

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 space-y-2 border border-gray-700">
        <p className="font-semibold">📦 Criar Evento — Albion Event Bot V1.0</p>
        <p>Reaja com o emoji ⚔️ para criar um evento</p>
        <p>
          🧾 <strong>Taxa da guild:</strong> 0%
        </p>
        <p>
          💸 <strong>Taxa do vendedor:</strong> 0%
        </p>
        <p>
          ⌛ <strong>Expiração do bot:</strong> tempo indeterminado
        </p>
      </div>

      <p>
        <strong>Taxa da Guild</strong> e <strong>Taxa do Vendedor</strong> são valores que serão distribuídos depois da
        <strong> finalização</strong> do evento.
      </p>

      <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
        <li>
          A <strong>taxa da guild</strong> é depositada diretamente no saldo da guild.
        </li>
        <li>
          A <strong>taxa do vendedor</strong> é adicionada ao saldo do próprio vendedor do evento.
        </li>
        <li>
          Essas taxas podem ser ajustadas pelos comandos:
          <ul className="list-disc pl-6 space-y-1 mt-1">
            <li>
              <code className="bg-gray-800 px-2 py-1 rounded text-sm">/atualizar-taxa-guild</code>
            </li>
            <li>
              <code className="bg-gray-800 px-2 py-1 rounded text-sm">/atualizar-taxa-vendedor</code>
            </li>
          </ul>
        </li>
      </ul>

      <p>
        A expiração do bot atualmente é <strong className="text-white">tempo indeterminado</strong>, pois o bot é
        completamente gratuito.
      </p>

      <p>
        Para criar o <strong className="text-white">evento</strong>, basta clicar no botão{" "}
        <strong className="text-white">⚔️ Criar Evento</strong>.
        <Image
          className="mt-2 mb-2"
          src="/create-event.png"
          alt="create event"
          quality={100}
          width={200}
          height={100}
        />
        O evento será criado automaticamente no canal <strong className="text-white">#participar-evento</strong>, onde
        irá conter as seguintes funcionalidades:
      </p>

      <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
        <li>
          <Link href="/docs/use/participate-event" className="underline hover:text-white">
            Participar do evento
          </Link>
        </li>
        <li>
          <Link href="/docs/use/start-event" className="underline hover:text-white">
            Iniciar o evento
          </Link>
        </li>
        <li>
          <Link href="/docs/use/delete-event" className="underline hover:text-white">
            Cancelar Evento
          </Link>
        </li>
        <li>
          <Link href="/docs/use/finish-event" className="underline hover:text-white">
            Finalizar Evento
          </Link>
        </li>
      </ul>
    </section>
  );
}
