import Link from "next/link";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen mt-12 max-w-[1280px]  mx-auto  ">
      <aside className="w-64 p-6 border-r border-gray-600 ">
        <nav className="flex flex-col gap-10 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-500">Primeiros Passos</h2>
            <ul className="border-l  border-gray-500 px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300 ">
              <li>
                <Link href="/docs">Instalação Bot</Link>
              </li>
              <li>
                <Link href="/docs/setup">Setup</Link>
              </li>
              <li>
                <Link href="/docs/channels">Canais</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-500">Como usar</h2>
            <ul className="border-l border-gray-500  px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
              <li>
                <Link href="/docs/use/create-event">Criar evento</Link>
              </li>
              <li>
                <Link href="/docs/use/participate-event">Participar Evento</Link>
              </li>
              <li>
                <Link href="/docs/use/start-event">Iniciar Evento</Link>
              </li>
              <li>
                <Link href="/docs/use/delete-event">Cancelar Evento</Link>
              </li>
              <li>
                <Link href="/docs/use/finish-event">Finalizar Evento</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-500">Market Price</h2>
            <ul className="border-l border-gray-500  px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
              <li>
                <Link href="/docs/">Consultar preços do Mercado</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-500">Comandos</h2>
            <ul className="border-l border-gray-500  px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
              <li>
                <Link href="/docs/commands/events">Eventos</Link>
              </li>
              <li>
                <Link href="/docs/commands/balances">Gerenciar Saldo</Link>
              </li>
              <li>
                <Link href="/docs/commands/transactions">Transações</Link>
              </li>
              <li>
                <Link href="/docs/language">Alterar Idioma</Link>
              </li>
              <li>
                <Link href="/">Consultar Mercado</Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="p-6 mx-auto md:max-w-3xl">{children}</main>
    </div>
  );
}
