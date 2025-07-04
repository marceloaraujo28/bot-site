"use client";

import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="lg:hidden border-b-1 border-gray-600">
        <div className="flex items-center gap-2 px-6 pb-2 mt-12 mx-auto max-w-3xl ">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu size={28} className="hover:text-gray-300 cursor-pointer" />
          </button>
          <Breadcrumb />
        </div>
      </div>
      <div className="flex flex-row min-h-screen lg:mt-12 mt-0 max-w-[1280px]  mx-auto">
        <aside
          className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#201d3c] overflow-y-auto lg:overflow-y-hidden p-6 border-r border-gray-600 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:flex lg:translate-x-0 lg:bg-transparent`}
        >
          <div className="flex lg:hidden items-center justify-between">
            <span>{""}</span>
            <button aria-label="Toggle Submenu" onClick={() => setIsOpen(!isOpen)}>
              <X size={24} className="hover:text-gray-900 text-white" />
            </button>
          </div>
          <nav className="flex flex-col gap-10 ">
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-500">Primeiros Passos</h2>
              <ul className="border-l  border-gray-500 px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300 ">
                <li>
                  <Link href="/docs" onClick={() => setIsOpen(false)}>
                    Instalação Bot
                  </Link>
                </li>
                <li>
                  <Link href="/docs/setup" onClick={() => setIsOpen(false)}>
                    Setup
                  </Link>
                </li>
                <li>
                  <Link href="/docs/channels" onClick={() => setIsOpen(false)}>
                    Canais
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-500">Como usar</h2>
              <ul className="border-l border-gray-500  px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
                <li>
                  <Link href="/docs/use/create-event" onClick={() => setIsOpen(false)}>
                    Criar evento
                  </Link>
                </li>
                <li>
                  <Link href="/docs/use/participate-event" onClick={() => setIsOpen(false)}>
                    Participar Evento
                  </Link>
                </li>
                <li>
                  <Link href="/docs/use/start-event" onClick={() => setIsOpen(false)}>
                    Iniciar Evento
                  </Link>
                </li>
                <li>
                  <Link href="/docs/use/delete-event" onClick={() => setIsOpen(false)}>
                    Cancelar Evento
                  </Link>
                </li>
                <li>
                  <Link href="/docs/use/finish-event" onClick={() => setIsOpen(false)}>
                    Finalizar Evento
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-500">Market Price</h2>
              <ul className="border-l border-gray-500  px-3 flex flex-col gap-3 text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
                <li>
                  <Link href="/docs/market" onClick={() => setIsOpen(false)}>
                    Consultar preços do Mercado
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-500">Comandos</h2>
              <ul className="border-l border-gray-500  px-3 flex flex-col gap-3  text-gray-300 [&>li:hover]:text-gray-100 transition-colors duration-300">
                <li>
                  <Link href="/docs/commands/events" onClick={() => setIsOpen(false)}>
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/docs/commands/balances" onClick={() => setIsOpen(false)}>
                    Gerenciar Saldo
                  </Link>
                </li>
                <li>
                  <Link href="/docs/commands/transactions" onClick={() => setIsOpen(false)}>
                    Transações
                  </Link>
                </li>
                <li>
                  <Link href="/docs/language" onClick={() => setIsOpen(false)}>
                    Alterar Idioma
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <main className="p-6 mx-auto md:max-w-3xl">{children}</main>

        {isOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)}></div>
        )}
      </div>
    </>
  );
}
