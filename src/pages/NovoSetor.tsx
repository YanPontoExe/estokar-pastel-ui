import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { setoresAPI } from "@/services/api";

// 🚨 IMPORTANTE: SUBSTITUA PELA URL REAL DO SEU BACKEND
const API_URL = "http://localhost:8080/Setor"; 

// ⭐ Interface para o ESTADO do Componente (Select retorna string '1' ou '0')
  interface FormSetorState {
  descricao: string; 
}

// ⭐ Interface para o PAYLOAD ENVIADO ao Backend (status deve ser number INT)
interface FormSetorPayload {
  descricao: string;
}


// // // ✅ IMPLEMENTAÇÃO REAL DA API: Usando fetch
// // // A função agora espera o payload com 'status' como number
// // const setoresAPI = {
// //   create: async (data: FormSetorPayload) => {
// //     console.log("REAL API: Tentativa de envio de dados para:", API_URL, data);
    
// //     // Configuração da requisição POST
// //     const response = await fetch(API_URL, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       }, 
// //     });

// //     if (!response.ok) {
// //         let errorDetail = { message: `Erro no servidor: Status ${response.status}` };
// //         try {
// //             errorDetail = await response.json();
// //         } catch (e) { }
        
// //         throw new Error(errorDetail.message || `Falha no cadastro com status: ${response.status}`);
// //     }

// //     // Este retorno deve ser ajustado para o que sua API Java realmente retorna
// //     return {
// //         status: response.status,
// //         data: { message: "Setor criado com sucesso no servidor." } // Simulação de retorno de sucesso
// //     };
//   },
// };

// ✅ Componente principal
const App = () => {
  const handleNavigation = (path: string) => {
    console.log(`Navegação limpa simulada para: ${path}`);
    const baseUrl = window.location.origin;
    window.location.replace(`${baseUrl}${path}`);
  };
  
  // Usamos FormSetorState para o useState
  const [setorData, setSetorData] = useState<FormSetorState>({
    descricao: ""
  });

  const handleChange = (name: keyof FormSetorState, value: string) => {
    setSetorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (name: keyof FormSetorState) => (value: string) => {
      handleChange(name, value);
  };
  
  // --- Função de Submissão e Requisição API ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🎯 PAYLOAD FINAL: Conversão de string para number
    const payloadParaBackend: FormSetorPayload = {
      descricao: setorData.descricao
    };
    
    try {
      // 🔄 CHAMA A API REAL com o payload convertido
      const response = await setoresAPI.create(payloadParaBackend);
      handleNavigation("/setores"); 
      
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error(`Erro ao cadastrar: ${error instanceof Error ? error.message : "Falha na comunicação com o servidor."}`);
      }
  };

  // --- JSX ---
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/setores")}
          className="hover:bg-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Setor</h1>
          <p className="text-gray-500">Cadastre um novo setor</p>
        </div>
      </div>

      <Card className="bg-white shadow-xl border border-gray-200 max-w-4xl mx-auto rounded-lg">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-gray-800 text-xl">Informações do Setor</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 6. descricao (Descrição) */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="font-medium text-gray-700">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Nome do setor..."
                className="min-h-[100px] border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={setorData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleNavigation("/setores")}
                className="hover:bg-gray-100 border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md" >
                Cadastrar Setor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;