"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#201d3c] p-2 shadow-lg">
      <div className="container m-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Albion Event Bot"
              width={55}
              height={55}
              className="rounded-2xl opacity-80 shadow-lg hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            <Link
              href="/"
              className="text-gray-300 text-base font-medium hover:text-gray-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/docs"
              className="text-gray-300 text-base font-medium hover:text-gray-400 transition-colors duration-300"
            >
              Documentação
            </Link>
            <Link
              href="/contribution"
              className="text-green-400 text-base font-medium hover:text-green-300 transition-colors duration-300"
            >
              Fazer Doação
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu size={28} />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#201d3c] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-white font-bold text-lg">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={24} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <Link href="/" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/docs" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            Documentação
          </Link>
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </nav>
  );
}

export default Navbar;
