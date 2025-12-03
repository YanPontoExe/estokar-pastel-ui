import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; 
import { ArrowLeft, Briefcase } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";

// Tipagem para as props do componente (requer navigateTo)
interface NovoSetorProps {
  navigateTo: (path: string) => void;
}

// ⭐ Tipagem para o estado do formulário de setor
interface SetorFormData {
  id_setor: string;
  descricao: string;
}

// 🚨 SIMULAÇÃO DE API: Mock simples de 'setoresAPI'
const setoresAPI = {
  create: (data: SetorFormData) => {
    // console.log("MOCK API: Tentativa de envio de dados de setor:", data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% de chance de sucesso
                resolve({ 
                    status: 201, 
                    data: { message: "Setor cadastrado com sucesso (MOCK)." } 
                });
            } else {
                reject({ 
                    status: 500, 
                    data: { message: "Erro de servidor simulado." } 
                });
            }
        }, 1500);
    });
  },
};

// ✅ Componente principal para Cadastro de Setores
const NovoSetor: React.FC<NovoSetorProps> = ({ navigateTo }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SetorFormData>({
    id_setor: '',
    descricao: '',
  });
  
  // --- Funções de Manipulação de Estado ---

  // Função genérica para atualizar o estado ao mudar o valor
  const handleChange = (name: keyof SetorFormData, value: string) => {
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
    if (!formData.id_setor || !formData.descricao) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
    }
    
    const payloadParaBackend = formData;

    try {
      const response: any = await setoresAPI.create(payloadParaBackend);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(response.data.message || "Setor cadastrado com sucesso!");
        // Simulação de redirecionamento para a lista de setores
        navigateTo("/"); 
      } else {
        const errorDetail = response?.data?.message || 'Detalhes desconhecidos';
        toast.error(`Erro ao cadastrar o setor: Status ${response?.status || 'N/A'} - ${errorDetail}`);
      }
    } catch (error: any) {
      // console.error("Erro na requisição:", error);
      const errorMsg = error?.data?.message || "Erro ao conectar com o servidor ou ao cadastrar o setor.";
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
          onClick={() => navigateTo("/setores")}
          className="hover:bg-gray-200"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastrar Novo Setor</h1>
          <p className="text-gray-500">Registre um novo setor ou departamento da empresa.</p>
        </div>
      </div>

      <Card className="bg-white shadow-xl border border-gray-200 max-w-4xl mx-auto rounded-lg">
        <CardHeader className="border-b p-6 bg-blue-50/50">
          <CardTitle className="text-blue-800 text-xl flex items-center gap-2">
            <Briefcase className="h-5 w-5" /> Dados do Setor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Seção 1: ID do Setor */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* 1. id_setor */}
              <div className="space-y-2 col-span-full md:col-span-1">
                <Label htmlFor="id_setor" className="font-medium text-gray-700">Identificador do Setor</Label>
                <Input 
                  id="id_setor" 
                  name="id_setor"
                  placeholder="Ex: PROD-01" 
                  required 
                  value={formData.id_setor}
                  onChange={(e) => handleChange("id_setor", e.target.value)}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Seção 2: Descrição (Full Width) */}
            <div className="space-y-2">
                <Label htmlFor="descricao" className="font-medium text-gray-700">Descrição Detalhada</Label>
                <Textarea
                    id="descricao"
                    name="descricao"
                    rows={4}
                    placeholder="Descreva as responsabilidades e o objetivo principal deste setor (Ex: Responsável pela montagem e testes finais de produtos)."
                    required
                    value={formData.descricao}
                    onChange={(e) => handleChange("descricao", e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                    disabled={loading}
                />
            </div>
            

            {/* Botões de Ação */}
            <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigateTo("/setores")}
                className="hover:bg-gray-100 border-gray-300 text-gray-700"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Setor'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoSetor;