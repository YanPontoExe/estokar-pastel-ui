import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";

// 🚨 SIMULAÇÃO DE API: Definindo um mock simples de 'materiaisAPI'
// Mantido do fix anterior
const materiaisAPI = {
  create: (data: any) => {
    console.log("MOCK API: Tentativa de envio de dados:", data);
    return Promise.resolve({ 
      status: 201, 
      data: { message: "Material criado com sucesso (MOCK)." } 
    });
  },
};

// ⭐ Interface de Dados do Formulário (Somente os campos necessários para o Backend)
interface FormMaterialData {
  id_material: string;   // Recebe o 'Código' do Front
  cod_fornecedor: string;
  marca: string;
  status: string;        // Recebe o 'Setor'/'Status' do Front
  descricao: string;
  data_cadastro: string; // Gerado automaticamente
}

// ✅ Componente principal
const App = () => {
  // 🧭 SIMULAÇÃO DE NAVEGAÇÃO: Função para simular a navegação
  const handleNavigation = (path: string) => {
    console.log(`Navegação simulada para: ${path}`);
    window.location.hash = path; 
  };
  
  const [materialData, setMaterialData] = useState<FormMaterialData>({
    // Valores Iniciais
    id_material: "",
    cod_fornecedor: "",
    marca: "",
    status: "",
    descricao: "",
    data_cadastro: new Date().toISOString().split('T')[0], // Define a data de hoje (YYYY-MM-DD)
  });

  // --- Funções de Manipulação de Estado ---

  // Função genérica para atualizar o estado ao mudar o valor
  const handleChange = (name: keyof FormMaterialData, value: string) => {
    setMaterialData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Função para Select (lida com valores de string)
  const handleSelectChange = (name: keyof FormMaterialData) => (value: string) => {
      handleChange(name, value);
  };

  // Não precisamos mais de handleNumericInputChange, pois os campos numéricos foram removidos.
  
  // --- Função de Submissão e Requisição API ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🎯 PAYLOAD FINAL: O payload é simplesmente o estado completo, pois só tem os campos do Backend
    const payloadParaBackend = materialData;
    
    console.log("Payload Enviado:", payloadParaBackend);

    try {
      const response = await materiaisAPI.create(payloadParaBackend);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(response.data.message || "Material cadastrado com sucesso!");
        handleNavigation("/materiais"); 
      } else {
        const errorDetail = response?.data?.message || 'Detalhes desconhecidos';
        toast.error(`Erro ao cadastrar: Status ${response?.status || 'N/A'} - ${errorDetail}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao conectar com o servidor ou ao cadastrar o material.");
    }
  };

  // --- JSX (Marcações) ---
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/materiais")}
          className="hover:bg-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Material</h1>
          <p className="text-gray-500">Cadastre um novo material no estoque</p>
        </div>
      </div>

      <Card className="bg-white shadow-xl border border-gray-200 max-w-4xl mx-auto rounded-lg">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-gray-800 text-xl">Informações do Material</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              
              {/* 1. id_material (Código) */}
              <div className="space-y-2">
                <Label htmlFor="id_material" className="font-medium text-gray-700">Código (ID Material)</Label>
                <Input 
                  id="id_material" 
                  placeholder="EX: MAT-001" 
                  required 
                  value={materialData.id_material}
                  onChange={(e) => handleChange("id_material", e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 2. cod_fornecedor (Cód. Fornecedor) */}
              <div className="space-y-2">
                <Label htmlFor="cod_fornecedor" className="font-medium text-gray-700">Cód. Fornecedor</Label>
                <Input 
                  id="cod_fornecedor" 
                  placeholder="Ex: FOR-ABC-123" 
                  required 
                  value={materialData.cod_fornecedor}
                  onChange={(e) => handleChange("cod_fornecedor", e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 3. marca (Marca) */}
              <div className="space-y-2">
                <Label htmlFor="marca" className="font-medium text-gray-700">Marca</Label>
                <Select required value={materialData.marca} onValueChange={handleSelectChange("marca")}>
                  <SelectTrigger id="marca" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marca-A">Marca A</SelectItem>
                    <SelectItem value="Marca-B">Marca B</SelectItem>
                    <SelectItem value="Marca-C">Marca C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 4. status (Setor / Status) */}
              <div className="space-y-2">
                <Label htmlFor="status" className="font-medium text-gray-700">Setor / Status</Label>
                <Select required value={materialData.status} onValueChange={handleSelectChange("status")}>
                  <SelectTrigger id="status" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Selecione o setor/status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Almoxarifado">Almoxarifado</SelectItem>
                    <SelectItem value="Producao">Produção</SelectItem>
                    <SelectItem value="Manutencao">Manutenção</SelectItem>
                    <SelectItem value="Expedicao">Expedição</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. data_cadastro (Inclusão) - Apenas para visualização ou informativo */}
               <div className="space-y-2 col-span-full lg:col-span-1">
                <Label htmlFor="data_cadastro" className="font-medium text-gray-700">Data de Cadastro</Label>
                {/* O valor é gerado automaticamente e exibido como ReadOnly */}
                <Input 
                    id="data_cadastro" 
                    type="date" 
                    readOnly 
                    value={materialData.data_cadastro}
                    className="border-gray-300 bg-gray-100 cursor-default"
                />
              </div>

            </div>

            {/* 6. descricao (Descrição) - Campo completo na linha de baixo */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="font-medium text-gray-700">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Informações adicionais sobre o material..."
                className="min-h-[100px] border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={materialData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleNavigation("/materiais")}
                className="hover:bg-gray-100 border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md">
                Cadastrar Material
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;