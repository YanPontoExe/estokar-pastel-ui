import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { relatorioAPI } from "@/services/api";
import { toast } from "sonner";
import { Search } from "lucide-react"; // Importando ícone de busca

export interface RelatorioItem {
  id_movimentacao: number;
  quantidade: number;
  nome_material: string;
  usuario: string | null;
  tipo_movimentacao: string;
}

const Relatorios = () => {
  const [filterIdMaterial, setFilterIdMaterial] = useState<string>("");
  const [relatorio, setRelatorio] = useState<RelatorioItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchRelatorio = async () => {
        setLoading(true);
        try {
            let url = "/Movimentacao/relatorio"; // URL base

            // Converte e valida o filtro
            const id = parseInt(filterIdMaterial);
            const isFilterActive = filterIdMaterial.trim() !== "";

            if (isFilterActive) {
                if (isNaN(id)) {
                    // Caso o usuário tente filtrar com texto
                    toast.error("O filtro deve ser um número inteiro (ID do Material).");
                    setLoading(false);
                    return;
                }
                // Monta a URL com o query parameter: /Movimentacao/relatorio?idMaterial=X
                url = `/Movimentacao/relatorio?idMaterial=${id}`;
            }
            
            // 🚨 CHAMADA DE API: Usando a URL dinâmica
            // O seu relatorioAPI.getAll PRECISA aceitar esta URL completa
            const response = await relatorioAPI.getAll(url); 
            
            setRelatorio(response);
            toast.success("Relatório carregado com sucesso!");
        } catch (error) {
            console.error("Erro ao buscar relatório:", error);
            toast.error("Falha ao carregar o relatório.");
        } finally {
            setLoading(false);
        }
    };

  // Função para tratar o ENTER no campo de input
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleFetchRelatorio();
        }
    };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold">Relatórios de Movimentação</h1>

      {/* 🆕 BARRA DE FILTRO */}
            <div className="flex items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Filtrar por ID do Material (Ex: 1)"
                    value={filterIdMaterial}
                    onChange={(e) => setFilterIdMaterial(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full max-w-sm"
                />
                <Button onClick={handleFetchRelatorio} disabled={loading} className="flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    {loading ? "Carregando..." : "Gerar Relatório"}
                </Button>
            </div>
            {/* 🆕 FIM DA BARRA DE FILTRO */}

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
                <th className="border p-2">Tipo da Movimentação</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
              {relatorio.map((item) => (
                <tr key={item.id_movimentacao}>
                  <td className="text-center border p-2">{item.id_movimentacao}</td>
                  <td className="text-center border p-2">{item.nome_material}</td>
                  <td className="text-center border p-2">{item.quantidade}</td>
                  <td className="text-center border p-2">{item.usuario || "-"}</td>
                  <td className="text-center border p-2">{item.tipo_movimentacao}</td>
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
