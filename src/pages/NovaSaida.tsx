import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Mantido para o campo 'motivo'
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";

// Tipagem para as props do componente (requer navigateTo)
interface NovaSaidaProps {
  navigateTo: (path: string) => void;
}


// ⭐ Tipagem para o estado do formulário de saída
interface SaidaFormData {
  id_movimentacao: string;
  data_saida: string;
  motivo: string;
  cod_funcionario: string;
}
const handleNavigation = (path: string) => {
    console.log(`Navegação limpa simulada para: ${path}`);
    
    // Pega o domínio base (Ex: http://localhost:8081)
    const baseUrl = window.location.origin;
    
    // Usa window.location.replace para ir para a URL completa do destino (Ex: http://localhost:8081/funcionarios)
    // Isso substitui o caminho anterior, resolvendo o problema do URL com hash duplo.
    window.location.replace(`${baseUrl}${path}`);
  };
// 🚨 SIMULAÇÃO DE API: Mock simples de 'saidasAPI'
const saidasAPI = {
  create: (data: SaidaFormData) => {
    // console.log("MOCK API: Tentativa de envio de dados de saída:", data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% de chance de sucesso
                resolve({ 
                    status: 201, 
                    data: { message: "Saída registrada com sucesso (MOCK)." }
                });
            } else {
                reject({ 
                    status: 500, 
                    data: { message: "Saída registrada com sucesso." }
                });
            }
        }, 1500);
    });
  },
};

// ✅ Componente principal para Registro de Saídas
const NovaSaida: React.FC<NovaSaidaProps> = ({ navigateTo }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SaidaFormData>({
    id_movimentacao: '',
    data_saida: new Date().toISOString().split('T')[0], // Data atual como default
    motivo: '',
    cod_funcionario: '',
  });
  
  // --- Funções de Manipulação de Estado ---

  // Função genérica para atualizar o estado ao mudar o valor
  const handleChange = (name: keyof SaidaFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // --- Função de Submissão e Requisição API ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validação básica
    if (!formData.id_movimentacao || !formData.motivo || !formData.cod_funcionario) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
    }
    
    const payloadParaBackend = formData;

    try {
      const response: any = await saidasAPI.create(payloadParaBackend);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(response.data.message || "Saída registrada com sucesso!");
        navigateTo("/"); // Redireciona para a lista de saídas
      } else {
        const errorDetail = response?.data?.message || 'Detalhes desconhecidos';
        toast.error(`Erro ao registrar a saída: Status ${response?.status || 'N/A'} - ${errorDetail}`);
      }
    } catch (error: any) {
      // console.error("Erro na requisição:", error);
      const errorMsg = error?.data?.message || "Erro ao conectar com o servidor ou ao registrar a saída.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- JSX (Marcações) ---
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        {/* Botão de navegação */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateTo("/saidas")}
          className="hover:bg-gray-200"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registrar Nova Saída</h1>
          <p className="text-gray-500">Documente a movimentação de saída de material do estoque.</p>
        </div>
      </div>

      <Card className="bg-white shadow-xl border border-gray-200 max-w-4xl mx-auto rounded-lg">
        <CardHeader className="border-b p-6 bg-green-50/50"> {/* Cor de fundo alterada para verde suave */}
          <CardTitle className="text-green-800 text-xl flex items-center gap-2"> {/* Cor do texto alterada para verde forte */}
            <Send className="h-5 w-5" /> Detalhes da Movimentação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Seção 1: Dados Principais (Grid 2 Colunas) */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* 1. id_movimentacao */}
              <div className="space-y-2">
                <Label htmlFor="id_movimentacao" className="font-medium text-gray-700">ID da Movimentação</Label>
                <Input 
                  id="id_movimentacao" 
                  name="id_movimentacao"
                  placeholder="Ex: SAIDA-2025001" 
                  required 
                  value={formData.id_movimentacao}
                  onChange={(e) => handleChange("id_movimentacao", e.target.value)}
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500" 
                  disabled={loading}
                />
              </div>
              
              {/* 2. data_saida - ReadOnly, valor gerado no useState */}
               <div className="space-y-2">
                <Label htmlFor="data_saida" className="font-medium text-gray-700">Data da Saída</Label>
                <Input 
                    id="data_saida" 
                    name="data_saida"
                    type="date" 
                    readOnly 
                    value={formData.data_saida}
                    className="border-gray-300 bg-gray-100 cursor-default"
                    disabled={loading}
                />
              </div>
              
              {/* 3. cod_funcionario */}
              <div className="space-y-2 col-span-full md:col-span-1">
                <Label htmlFor="cod_funcionario" className="font-medium text-gray-700">Código do Funcionário Responsável</Label>
                <Input 
                  id="cod_funcionario" 
                  name="cod_funcionario"
                  placeholder="Ex: F00123" 
                  required 
                  value={formData.cod_funcionario}
                  onChange={(e) => handleChange("cod_funcionario", e.target.value)}
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500" 
                  disabled={loading}
                />
              </div>
              
            </div>
            
            {/* Seção 2: Motivo (Full Width) */}
            <div className="space-y-2">
                <Label htmlFor="motivo" className="font-medium text-gray-700">Motivo da Saída</Label>
                <Textarea
                    id="motivo"
                    name="motivo"
                    rows={4}
                    placeholder="Descreva brevemente o motivo detalhado da saída (Ex: uso interno para manutenção corretiva, descarte por vencimento, etc.)"
                    required
                    value={formData.motivo}
                    onChange={(e) => handleChange("motivo", e.target.value)}
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500" 
                    disabled={loading}
                />
            </div>
            

            {/* Botões de Ação */}
            <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigateTo("/saidas")}
                className="hover:bg-gray-100 border-gray-300 text-gray-700"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrar Saída'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovaSaida;