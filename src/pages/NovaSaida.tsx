import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { saidasAPI } from '@/services/api';

// // 🚨 SIMULAÇÃO DE API: Definindo mock para saidas
// const saidasAPI = {
//   create: (data: any) => {
//     console.log("MOCK API: Tentativa de envio de dados de saida:", data);
//     return Promise.resolve({ 
//       status: 201, 
//       data: { message: "Registro de saida criado com sucesso (MOCK)." } 
//     });
//   },
// };

// Interface de Dados do Formulário (O id_movimentacao foi removido daqui)
interface FormsaidaData { 
    cod_funcionario: string;
    motivo: string;
    data_saida: string;
    cod_material: number;
    quantidade: number;
    cod_usuario: string;
}

interface FormMaterialPayload {
    cod_funcionario: string;
    motivo: string;
    data_saida: string;
    cod_material: number;
    quantidade: number;
    cod_usuario: string;
}

// // ✅ Componente principal para Cadastro de saida (Novasaida)
// // O nome do componente é App para compatibilidade com o export padrão do Canvas
// const App = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
    
    const App = () => {
    const handleNavigation = (path: string) => {
        console.log(`Navegação limpa simulada para: ${path}`);
        const baseUrl = window.location.origin;
        window.location.replace(`${baseUrl}${path}`);
    };

    // // Data de saida padrão é a data de hoje
    // const today = new Date().toISOString().split('T')[0];

    // Inicialização do estado (id_movimentacao removido)
    const [saidaData, setsaidaData] = useState({
      cod_material: "",
      quantidade: "",
      cod_usuario: "",
      data_saida: new Date().toISOString().split("T")[0],
      motivo: "",
      cod_funcionario: "",
    });

    // Função para lidar com a mudança de campos de texto ou numéricos
    const handleChange = (name: keyof FormsaidaData, value: string | number) => {
        setsaidaData((prev) => ({ ...prev, [name]: value }));
    };

    // // Função de Submissão e Requisição API
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         // Converte a quantidade para número antes de enviar, se for string
    //         const payloadParaBackend = {
    //             ...entradaData,
    //             quantidade: Number(entradaData.quantidade),
    //         };
            
    //         const response = await entradasAPI.create(payloadParaBackend);
            
    //         if (response && response.status >= 200 && response.status < 300) {
    //             toast.success(response.data.message || "Entrada cadastrada com sucesso!");
    //             // Usa a função de navegação fornecida pelo App principal (ex: voltar para o dashboard)
    //             navigateTo("/"); 
    //         } else {
    //              toast.error(`Erro ao cadastrar entrada.`);
    //         }
    //     } catch (error) {
    //         console.error("Erro na requisição da entrada:", error);
    //         toast.error("Erro ao conectar com o servidor.");
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      const payload = {
        cod_material: Number(saidaData.cod_material),
        quantidade: Number(saidaData.quantidade),
        usuario: { id_usuario: Number(saidaData.cod_usuario) }, // ← coloque o ID do usuário logado
        cod_funcionario: Number(saidaData.cod_funcionario),
        motivo: saidaData.motivo,
        data_saida: new Date().toISOString(),
      };
    
      try {
        await saidasAPI.create(payload);
        toast.success("Saida cadastrada com sucesso!");
        handleNavigation("/saidas");
      } catch (error) {
        console.error("Erro ao cadastrar saida:", error);
        toast.error("Erro ao cadastrar saida.");
      }
    };

    // --- JSX (Marcações) ---
    return (
        <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => handleNavigation("/entradas")} className="hover:bg-gray-200">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova saida de Estoque</h1>
                    <p className="text-gray-500">Registre o recebimento de produtos e materiais</p>
                </div>
            </div>

            <Card className="bg-white shadow-xl border border-gray-200 max-w-3xl mx-auto rounded-lg">
                <CardHeader className="border-b p-6">
                    <CardTitle className="text-gray-800 text-xl">Dados da saida</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            
                            {/* 1. cod_funcionario (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="cod_funcionario" className="font-medium text-gray-700">Código do Fornecedor</Label>
                                <Input 
                                    id="cod_funcionario" 
                                    placeholder="Ex: F00123" 
                                    required 
                                    value={saidaData.cod_funcionario}
                                    onChange={(e) => handleChange("cod_funcionario", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 2. cod_material (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="cod_material" className="font-medium text-gray-700">Código do Material</Label>
                                <Input 
                                    id="cod_material" 
                                    placeholder="(Apenas números)" 
                                    required 
                                    value={saidaData.cod_material}
                                    onChange={(e) => handleChange("cod_material", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 3. quantidade (Number, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="quantidade" className="font-medium text-gray-700">Quantidade</Label>
                                <Input 
                                    id="quantidade" 
                                    type="number"
                                    placeholder="Quantidade de itens recebidos" 
                                    required 
                                    min="1"
                                    value={saidaData.quantidade}
                                    onChange={(e) => handleChange("quantidade", Number(e.target.value))}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div> 

                            {/* 4. motivo (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="motivo" className="font-medium text-gray-700">Motivo</Label>
                                <Input 
                                    id="motivo" 
                                    placeholder="Ex: 000123456" 
                                    required 
                                    value={saidaData.motivo}
                                    onChange={(e) => handleChange("motivo", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 5. data_saida (String Date, auto-filled) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="data_saida" className="font-medium text-gray-700">Data de saida</Label>
                                <Input 
                                    id="data_saida" 
                                    type="date" 
                                    readOnly 
                                    value={saidaData.data_saida}
                                    className="border-gray-300 bg-gray-100 cursor-default"
                                />
                            </div>

                             {/* 6. cod_usuario (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="cod_usuario" className="font-medium text-gray-700">Id do usuário</Label>
                                <Input 
                                    id="cod_usuario" 
                                    placeholder="Ex: 000123456" 
                                    required 
                                    value={saidaData.cod_usuario}
                                    onChange={(e) => handleChange("cod_usuario", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* Campo Vazio para alinhamento de grid (antes o cod_usuario estava aqui) */}
                            <div className="hidden md:block"></div>

                        </div>
                        
                        <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleNavigation("/saidas")}
                                className="hover:bg-gray-100 border-gray-300 text-gray-700"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md">
                                Registrar saida
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default App;