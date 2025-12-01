import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { dashboardAPI } from "@/services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total de Materiais",
      value: "0",
      icon: Package,
      description: "Itens cadastrados",
    },
    {
      title: "Funcionários Ativos",
      value: "0",
      icon: Users,
      description: "No sistema",
    },
    {
      title: "Entradas (Mês)",
      value: "0",
      icon: ArrowDownToLine,
      description: "Últimos 30 dias",
    },
    {
      title: "Saídas (Mês)",
      value: "0",
      icon: ArrowUpFromLine,
      description: "Últimos 30 dias",
    },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData, lowStockData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity(),
        dashboardAPI.getLowStock(),
      ]);
      
      setStats(statsData);
      setRecentActivity(activityData);
      setLowStock(lowStockData);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    }
  };

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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.item}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma atividade recente</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Materiais com Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStock.length > 0 ? (
                lowStock.map((material, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{material.name}</p>
                      <p className="text-xs text-muted-foreground">Mínimo: {material.min}</p>
                    </div>
                    <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                      {material.qty} unid.
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum material com estoque baixo</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
