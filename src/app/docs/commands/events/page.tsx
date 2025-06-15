import { CommandItem } from "../../components/CommandItem";

export default function ComandosEventosPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">🌟 Comandos de Eventos</h1>

      <p>
        Estes comandos são utilizados para gerenciar eventos e a participação dos membros. Alguns comandos são restritos
        a administradores e responsáveis por operações críticas.
      </p>

      <div className="space-y-4">
        {/* Comando 1 */}
        <CommandItem name="/vendedor" description="Adiciona um vendedor ao evento atual." />

        {/* Comando 2 */}
        <CommandItem
          name="/simular-evento"
          description="Simula a divisão de lucros do evento entre os participantes."
        />

        {/* Comando 3 */}
        <CommandItem name="/atualizar-participacao" description="Altera a porcentagem de participação de um jogador." />

        {/* Comando 4 - Admin */}
        <CommandItem name="/atualizar-taxa-vendedor" description="Ajusta a taxa paga aos vendedores." admin />

        {/* Comando 5 - Admin */}
        <CommandItem name="/atualizar-taxa-guild" description="Ajusta a taxa paga à guild." admin />

        {/* Comando 6 */}
        <CommandItem name="/depositar-evento" description="Deposita os valores do evento no saldo dos participantes." />

        {/* Comando 7 - Admin */}
        <CommandItem
          name="/arquivar-evento"
          description="Arquiva o evento e envia um resumo no canal financeiro."
          admin
        />
      </div>
    </section>
  );
}
