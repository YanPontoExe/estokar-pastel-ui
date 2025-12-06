import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { materiaisAPI } from "@/services/api";


// 🚨 IMPORTANTE: SUBSTITUA PELA URL REAL DO SEU BACKEND
const API_URL = "http://localhost:8080/Material"; 

// ⭐ Interface para o ESTADO do Componente (Select retorna string '1' ou '0')
interface FormMaterialState {
  descricao: string;
  marca: string;
  cod_fornecedor: number;
  status: string;
  dataCadastro: string;
}

// ⭐ Interface para o PAYLOAD ENVIADO ao Backend (status deve ser number INT)
interface FormMaterialPayload {
  descricao: string;
  marca: string;
  cod_fornecedor: number;
  status: string;
  dataCadastro: string;
}


// // ✅ IMPLEMENTAÇÃO REAL DA API: Usando fetch
// // A função agora espera o payload com 'status' como number
// const materiaisAPI = {
//   create: async (data: FormMaterialPayload) => {
//     console.log("REAL API: Tentativa de envio de dados para:", API_URL, data);
    
//     // Configuração da requisição POST
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // 🎯 Conversão: JSON.stringify transforma o 'status: 1' em {"status": 1} (número JSON)
//       body: JSON.stringify(data), 
//     });

//     if (!response.ok) {
//         let errorDetail = { message: `Erro no servidor: Status ${response.status}` };
//         try {
//             errorDetail = await response.json();
//         } catch (e) { }
        
//         throw new Error(errorDetail.message || `Falha no cadastro com status: ${response.status}`);
//     }

//     // Este retorno deve ser ajustado para o que sua API Java realmente retorna
//     return {
//         status: response.status,
//         data: { message: "Material criado com sucesso no servidor." } // Simulação de retorno de sucesso
//     };
//   },
// };

// ✅ Componente principal
const App = () => {
  const handleNavigation = (path: string) => {
    console.log(`Navegação limpa simulada para: ${path}`);
    const baseUrl = window.location.origin;
    window.location.replace(`${baseUrl}${path}`);
  };
  
  // Usamos FormMaterialState para o useState
  const [materialData, setMaterialData] = useState({
  descricao: "",
  marca: "",
  cod_fornecedor: 0,
  status: "1",
  dataCadastro: new Date().toISOString().split("T")[0],
});

  const handleChange = (name: keyof FormMaterialState, value: string) => {
    setMaterialData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (name: keyof FormMaterialState) => (value: string) => {
      handleChange(name, value);
  };
  
  // --- Função de Submissão e Requisição API ---

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // 🎯 PAYLOAD FINAL: Conversão de string para number
  //   const payloadParaBackend: FormMaterialPayload = {
  //     ...materialData,
  //     // ✅ AÇÃO CHAVE: Converte a string "1" ou "0" para o número 1 ou 0
  //     status: Number(materialData.status), 
  //   };
    
  //   try {
  //     // 🔄 CHAMA A API REAL com o payload convertido
  //     const response = await materiaisAPI.create(payloadParaBackend);

  //     if (response && response.status >= 200 && response.status < 300) {
  //       toast.success(response.data.message || "Material cadastrado com sucesso!");
  //       handleNavigation("/"); 
  //     } 
      
  //   } catch (error) {
  //     console.error("Erro na requisição:", error);
  //     toast.error(`Erro ao cadastrar: ${error instanceof Error ? error.message : "Falha na comunicação com o servidor."}`);
      
  //     // ✅ MODIFICAÇÃO PARA REDIRECIONAMENTO FORÇADO
  //     // Garante que o usuário é redirecionado, mesmo após o erro na requisição.
  //     handleNavigation("/"); 
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    descricao: materialData.descricao,
    marca: materialData.marca,
    cod_fornecedor: Number(materialData.cod_fornecedor),
    dataCadastro: new Date().toISOString(),
    status: Number(materialData.status),
  };

  try {
    await materiaisAPI.create(payload);
    toast.success("Material cadastrado com sucesso!");
    handleNavigation("/materiais");
  } catch (error) {
    console.error("Erro ao cadastrar material:", error);
    toast.error("Erro ao cadastrar material.");
  }
};


  // --- JSX ---
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
              
              {/* 1. id_material (Código)
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
              </div> */}

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
                <Input
                  id="marca"
                  placeholder="Digite a marca"
                  required
                  value={materialData.marca}
                  onChange={(e) => handleChange("marca", e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 4. status (Status: 1=Ativo / 0=Inativo) */}
              <div className="space-y-2">
                <Label htmlFor="status" className="font-medium text-gray-700">Status (1=Ativo / 0=Inativo)</Label>
                <Select required value={materialData.status} onValueChange={handleSelectChange("status")}>
                  <SelectTrigger id="status" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ativo (1)</SelectItem>
                    <SelectItem value="0">Inativo (0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. data_cadastro (Inclusão) */}
               <div className="space-y-2 col-span-full lg:col-span-1">
                <Label htmlFor="data_cadastro" className="font-medium text-gray-700">Data de Cadastro</Label>
                <Input 
                    id="data_cadastro" 
                    type="date" 
                    readOnly 
                    value={materialData.dataCadastro}
                    className="border-gray-300 bg-gray-100 cursor-default"
                />
              </div>

            </div>

            {/* 6. descricao (Descrição) */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="font-medium text-gray-700">Descrição do Material</Label>
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
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md" >
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