import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-[#201d3c]  p-2 shadow-lg">
      <div className="container  p-2 m-auto max-w-[1400px]">
        <div className="flex items-center justify-between">
          <a href="/" className="">
            <Image
              src="/logo.png"
              alt="Albion Event Bot"
              width={55}
              height={55}
              className="rounded-2xl opacity-80 shadow-lg hover:opacity-100 transition-opacity duration-300"
            />
          </a>
          <div className="gap-4 flex">
            <a
              href="/"
              className="text-gray-300 text-base font-medium text-shadow-lg/30 hover:text-gray-400 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/docs"
              className="text-gray-300 text-base font-medium text-shadow-lg/30 hover:text-gray-400 transition-colors duration-300"
            >
              Documentação
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
