import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Materiais",
      value: "1,234",
      icon: Package,
      description: "Itens cadastrados",
    },
    {
      title: "Funcionários Ativos",
      value: "45",
      icon: Users,
      description: "No sistema",
    },
    {
      title: "Entradas (Mês)",
      value: "389",
      icon: ArrowDownToLine,
      description: "Últimos 30 dias",
    },
    {
      title: "Saídas (Mês)",
      value: "267",
      icon: ArrowUpFromLine,
      description: "Últimos 30 dias",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao EstoKar - Sistema de Gerenciamento de Estoque
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Entrada registrada", item: "Material X", time: "Há 2 horas" },
                { action: "Saída registrada", item: "Material Y", time: "Há 4 horas" },
                { action: "Novo funcionário", item: "João Silva", time: "Há 1 dia" },
                { action: "Marca cadastrada", item: "Marca ABC", time: "Há 2 dias" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Materiais com Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Parafuso M10", qty: 5, min: 20 },
                { name: "Tinta Branca", qty: 3, min: 10 },
                { name: "Lixa Grão 120", qty: 8, min: 15 },
                { name: "Cola PVA", qty: 2, min: 8 },
              ].map((material, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{material.name}</p>
                    <p className="text-xs text-muted-foreground">Mínimo: {material.min}</p>
                  </div>
                  <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                    {material.qty} unid.
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
