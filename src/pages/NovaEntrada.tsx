import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// 🚨 SIMULAÇÃO DE API: Definindo mock para Entradas
const entradasAPI = {
  create: (data: any) => {
    console.log("MOCK API: Tentativa de envio de dados de entrada:", data);
    return Promise.resolve({ 
      status: 201, 
      data: { message: "Registro de entrada criado com sucesso (MOCK)." } 
    });
  },
};

// Interface de Dados do Formulário (O id_movimentacao foi removido daqui)
interface FormEntradaData { 
    cod_fornecedor: string; 
    cod_material: string;
    quantidade: number;
    data_entrada: string;
    nota_fiscal: string;
}

// ✅ Componente principal para Cadastro de Entrada (NovaEntrada)
// O nome do componente é App para compatibilidade com o export padrão do Canvas
const App = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
    
    // Data de entrada padrão é a data de hoje
    const today = new Date().toISOString().split('T')[0];

    // Inicialização do estado (id_movimentacao removido)
    const [entradaData, setEntradaData] = useState<FormEntradaData>({ 
        cod_fornecedor: "", 
        cod_material: "",
        quantidade: 1, // Padrão 1
        data_entrada: today, 
        nota_fiscal: "",
    });

    // Função para lidar com a mudança de campos de texto ou numéricos
    const handleChange = (name: keyof FormEntradaData, value: string | number) => {
        setEntradaData((prev) => ({ ...prev, [name]: value }));
    };

    // Função de Submissão e Requisição API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Converte a quantidade para número antes de enviar, se for string
            const payloadParaBackend = {
                ...entradaData,
                quantidade: Number(entradaData.quantidade),
            };
            
            const response = await entradasAPI.create(payloadParaBackend);
            
            if (response && response.status >= 200 && response.status < 300) {
                toast.success(response.data.message || "Entrada cadastrada com sucesso!");
                // Usa a função de navegação fornecida pelo App principal (ex: voltar para o dashboard)
                navigateTo("/"); 
            } else {
                 toast.error(`Erro ao cadastrar entrada.`);
            }
        } catch (error) {
            console.error("Erro na requisição da entrada:", error);
            toast.error("Erro ao conectar com o servidor.");
        }
    };

    // --- JSX (Marcações) ---
    return (
        <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigateTo("/entradas")} className="hover:bg-gray-200">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova Entrada de Estoque</h1>
                    <p className="text-gray-500">Registre o recebimento de produtos e materiais</p>
                </div>
            </div>

            <Card className="bg-white shadow-xl border border-gray-200 max-w-3xl mx-auto rounded-lg">
                <CardHeader className="border-b p-6">
                    <CardTitle className="text-gray-800 text-xl">Dados da Entrada</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            
                            {/* 1. cod_fornecedor (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="cod_fornecedor" className="font-medium text-gray-700">Código do Fornecedor</Label>
                                <Input 
                                    id="cod_fornecedor" 
                                    placeholder="Ex: F00123" 
                                    required 
                                    value={entradaData.cod_fornecedor}
                                    onChange={(e) => handleChange("cod_fornecedor", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 2. cod_material (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="cod_material" className="font-medium text-gray-700">Código do Material</Label>
                                <Input 
                                    id="cod_material" 
                                    placeholder="Ex: M4567" 
                                    required 
                                    value={entradaData.cod_material}
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
                                    value={entradaData.quantidade}
                                    onChange={(e) => handleChange("quantidade", Number(e.target.value))}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 4. nota_fiscal (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="nota_fiscal" className="font-medium text-gray-700">Número da Nota Fiscal</Label>
                                <Input 
                                    id="nota_fiscal" 
                                    placeholder="Ex: 000123456" 
                                    required 
                                    value={entradaData.nota_fiscal}
                                    onChange={(e) => handleChange("nota_fiscal", e.target.value)}
                                    className="border-gray-300 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* 5. data_entrada (String Date, auto-filled) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="data_entrada" className="font-medium text-gray-700">Data de Entrada</Label>
                                <Input 
                                    id="data_entrada" 
                                    type="date" 
                                    readOnly 
                                    value={entradaData.data_entrada}
                                    className="border-gray-300 bg-gray-100 cursor-default"
                                />
                            </div>

                            {/* Campo Vazio para alinhamento de grid (antes o id_movimentacao estava aqui) */}
                            <div className="hidden md:block"></div>

                        </div>
                        
                        <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigateTo("/entradas")}
                                className="hover:bg-gray-100 border-gray-300 text-gray-700"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md">
                                Registrar Entrada
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default App;