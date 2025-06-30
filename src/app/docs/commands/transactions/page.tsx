import { CommandItem } from "../../components/CommandItem";

export default function TransacoesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">💳 Transações Financeiras</h1>

      <p>
        Comandos para movimentação de saldo, tanto pessoal quanto da guild. Comandos marcados como{" "}
        <strong>Admin</strong> são restritos.
      </p>

      <div className="space-y-4">
        <CommandItem name="/depositar-guild" description="Adiciona saldo ao caixa da guild." admin />

        <CommandItem name="/depositar-membro" description="Adiciona saldo à conta de um membro." admin />

        <CommandItem name="/sacar-guild" description="Retira saldo do caixa da guild." admin />

        <CommandItem name="/pagar-membro" description="Paga um membro utilizando saldo da guild." admin />

        <CommandItem name="/confiscar-saldo" description="Remove saldo de um membro e transfere para a guild." admin />

        <CommandItem name="/transferir-saldo" description="Transfere saldo da sua conta para outro membro." />
      </div>
    </section>
  );
}
