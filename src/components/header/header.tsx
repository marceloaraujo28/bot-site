"use client";
import { getDictionaryServer } from "@/dictionaries/server";
import { motion } from "framer-motion";
import { HandHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type DictionaryType = ReturnType<typeof getDictionaryServer>;

export default function Header({ t }: { t: DictionaryType }) {
  return (
    <section className="flex flex-col mt-10 md:mt-0 md:min-h-screen md:flex-row max-w-[1590px] items-center justify-between mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-center"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">{t.HomePage.title}</h1>
        <p className="text-gray-200 text-lg mb-6 max-w-xl text-center mx-auto">
          {t.HomePage.description}
          <br />
          <br />
          <strong>{t.HomePage.subtitle}</strong>
        </p>
        <div className="flex flex-col lg:flex-row justify-center gap-4 py-2">
          <Link
            href="https://discord.com/oauth2/authorize?client_id=1272188978765893714&permissions=8&scope=bot%20applications.commands"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-semibold p-6  rounded-xl shadow-lg transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image alt="Discord Logo" src="/discord.webp" width={24} height={24} className="inline-block mr-2" />
            <span>{t.HomePage.addToDiscord}</span>
          </Link>
          <Link
            href="/contribution"
            className="inline-block bg-green-500 hover:bg-green-800 text-black text-xl font-semibold p-6 rounded-xl shadow-lg transition duration-300"
          >
            <HandHeart color="black" size={24} className="inline-block mr-2" />
            <span>{t.HomePage.makeDonation}</span>
          </Link>
        </div>
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
  );
}
