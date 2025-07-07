import { DollarSign, Globe, Store, Package, HandHeart } from "lucide-react";
import { Locale } from "@/config/i18n.config";
import { use } from "react";
import Header from "@/components/header/header";
import { getDictionaryServer } from "@/dictionaries/server";

export default function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionaryServer(lang);

  return (
    <main className="flex flex-col">
      <Header t={t} />
      <section className="max-w-[1300px] mx-auto px-6 pb-4 mt-20 mb-20 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{t.HomePage.aboutBot}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Package color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">{t.HomePage.splitLoot}</h3>
              <p>{t.HomePage.splitLootDescription}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Store color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">{t.HomePage.marketPrice}</h3>
              <p>{t.HomePage.marketPriceDescription}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <DollarSign color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">{t.HomePage.balanceManagement}</h3>
              <p>{t.HomePage.balanceManagementDescription}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-row bg-[#221f41] border border-[#332f5d] p-4 rounded-xl shadow-md text-white">
            <div>
              <Globe color="white" size={35} />
            </div>
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-2">{t.HomePage.multilingual}</h3>
              <p>{t.HomePage.multilingualDescription}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
