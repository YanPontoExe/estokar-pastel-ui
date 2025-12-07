import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { relatorioAPI } from "@/services/api";
import { toast } from "sonner";

interface RelatorioItem {
  id_movimentacao: number;
  quantidade: number;
  nome_material: string;
  usuario: string | null;
}

const Relatorios = () => {
  const [relatorio, setRelatorio] = useState<RelatorioItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchRelatorio = async () => {
    setLoading(true);
    try {
      const response = await relatorioAPI.getAll();
      setRelatorio(response); // se quiser filtrar por idMaterial, use idMaterial ? `/relatorio?idMaterial=${idMaterial}` : '/relatorio'
      toast.success("Relatório carregado com sucesso!");
    } catch (error) {
      console.error("Erro ao buscar relatório:", error);
      toast.error("Falha ao carregar o relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold">Relatórios de Movimentação</h1>

      <Button onClick={handleFetchRelatorio} disabled={loading}>
        {loading ? "Carregando..." : "Gerar Relatório"}
      </Button>

      <Card className="bg-white shadow-xl border border-gray-200 rounded-lg mt-4">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID Movimentação</th>
                <th className="border p-2">Material</th>
                <th className="border p-2">Quantidade</th>
                <th className="border p-2">Usuário</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
              {relatorio.map((item) => (
                <tr key={item.id_movimentacao}>
                  <td className="border p-2">{item.id_movimentacao}</td>
                  <td className="border p-2">{item.nome_material}</td>
                  <td className="border p-2">{item.quantidade}</td>
                  <td className="border p-2">{item.usuario || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
