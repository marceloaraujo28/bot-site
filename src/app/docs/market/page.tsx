import Image from "next/image";

export default function MarketPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">💰 Consultar Preços de Mercado</h1>

      <p>
        O bot permite consultar os preços dos itens do mercado usando o comando{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">/preco</code>. Esse comando busca os valores em tempo
        real com base nos filtros aplicados.
      </p>

      <Image src="/market.png" alt="Participar do Evento" quality={100} width={400} height={200} />

      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 border border-gray-700 space-y-1">
        <p>
          📦 <strong>Item:</strong> Nome do item que deseja pesquisar.
        </p>
        <p>
          🏷️ <strong>Tier (opcional):</strong> Você pode especificar o nível do item (ex: T4, T6...).
        </p>
        <p>
          🏙️ <strong>Cidade (opcional):</strong> Escolha a cidade onde deseja consultar o preço.
        </p>
        <p>
          🌐 <strong>Servidor (opcional):</strong> Selecione o servidor para resultados mais precisos.
        </p>
      </div>

      <p>
        Para visualizar os campos opcionais ao digitar o comando, pressione{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">TAB</code> após escrever{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">/preco</code>. Isso abrirá todos os campos disponíveis
        para preenchimento.
      </p>

      <p>
        💡 <strong>Exemplo:</strong>{" "}
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">/preco casaco de mercenário</code>
      </p>

      <h2 className="text-xl font-semibold pt-4">🌐 Alterar idioma do mercado</h2>

      <p>
        Use o comando <code className="bg-gray-800 px-2 py-1 rounded text-sm">/price-lang</code> para alterar o idioma
        da resposta do mercado. Esse comando afeta somente o idioma da consulta de preços e pode ser usado por qualquer
        usuário.
      </p>
    </section>
  );
}
