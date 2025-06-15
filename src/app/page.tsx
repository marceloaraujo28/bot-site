"use client";

import Image from "next/image";
import { DollarSign, Globe, Store, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col mt-10 md:mt-0 md:min-h-screen md:flex-row max-w-[1590px] items-center justify-between mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">Albion Event Bot</h1>
          <p className="text-gray-200 text-lg mb-6 max-w-xl text-center mx-auto">
            Um bot para ajudar você a dividir loot e consultar preços do mercado em Albion Online.
            <br />
            <br />
            <strong>Divida o loot de forma justa e rápida com seus amigos!</strong>
          </p>
          <a
            href="#"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-semibold px-8 py-5 rounded-xl shadow-lg transition duration-300"
          >
            Adicionar ao Discord
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex flex-1 items-center justify-center "
        >
          <Image alt="Albion Event Bot Logo" src="/alpaca.png" width={600} height={500} />
        </motion.div>
      </section>
      <section className="max-w-[1300px] mx-auto px-6 pb-4 mt-20 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Sobre o Bot</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Package color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">Split Loot</h3>
              <p>
                Crie eventos, acompanhe a participação dos jogadores e simule a divisão de loot com base no tempo de
                participação de cada um — tudo de forma rápida e justa.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Store color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">Market Price</h3>
              <p>Consulte os preços de qualquer item do jogo direto no Discord, com suporte a todos os servidores.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <DollarSign color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">Gerenciamento de saldos</h3>
              <p>
                Controle os valores devidos a cada jogador após o evento, registre depósitos, saques e mantenha o saldo
                da guilda sempre organizado.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Globe color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">Multilíngue</h3>
              <p>
                O bot fala a sua língua! Suporte a múltiplos idiomas para facilitar o uso por jogadores do mundo todo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
