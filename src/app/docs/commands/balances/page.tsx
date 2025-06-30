import { CommandItem } from "../../components/CommandItem";

export default function GerenciarSaldoPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">💰 Gerenciar Saldo</h1>

      <p>
        Comandos para consultar e administrar o saldo de membros e da guild. Alguns comandos são restritos a
        administradores.
      </p>

      <div className="space-y-4">
        <CommandItem name="/meu-saldo" description="Consulta seu saldo pessoal atual." />

        <CommandItem name="/saldos" description="Exibe o saldo de todos os membros da guild." />

        <CommandItem name="/saldo-membro" description="Consulta o saldo de um membro específico." />

        <CommandItem name="/saldo-guild" description="Verifica o saldo total da guild." />
      </div>
    </section>
  );
}
