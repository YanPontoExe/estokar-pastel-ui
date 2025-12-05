import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // 👈 REMOVIDO: Não é suportado no ambiente Canvas
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// 🚨 SIMULAÇÃO DE API: Definindo mock para Marcas
const marcasAPI = {
  create: (data: any) => {
    console.log("MOCK API: Tentativa de envio de dados de marca:", data);
    return Promise.resolve({ status: 201, data: { message: "Marca cadastrada com sucesso (MOCK)." } });
  },
};

// Interface de Dados do Formulário
interface FormMarcaData { 
    nome_marca: string; 
    pais_origem: string; 
    descricao_marca: string;
    status: boolean; 
}

// ✅ Componente principal para Cadastro de Marcas
const App = () => { // 👈 Renomeado para App
    
    // 🧭 MODIFICAÇÃO DE NAVEGAÇÃO: Implementando a função de redirecionamento limpo
    const handleNavigation = (path: string) => {
        console.log(`Navegação limpa simulada para: ${path}`);
        const baseUrl = window.location.origin;
        // Usa window.location.replace para ir para a URL completa do destino
        window.location.replace(`${baseUrl}${path}`);
    };

    // Inicialização do estado
    const [marcaData, setMarcaData] = useState<FormMarcaData>({ 
        nome_marca: "", 
        pais_origem: "",
        descricao_marca: "",
        status: true, // Padrão: Ativa
    });

    // Função para lidar com a mudança de campos de texto/textarea
    const handleChange = (name: keyof FormMarcaData, value: string | boolean) => {
        setMarcaData((prev) => ({ ...prev, [name]: value }));
    };

    // Função para lidar com a mudança de Select (que retorna string, mas pode ser boolean)
    const handleSelectChange = (name: keyof FormMarcaData) => (value: string) => {
        // Converte string 'true'/'false' para boolean para o campo status
        const finalValue = name === 'status' ? (value === 'true') : value;
        handleChange(name, finalValue as string | boolean);
    };

    // Função de Submissão e Requisição API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // O payload é enviado exatamente com os dados do estado
            const payloadParaBackend = marcaData;
            
            const response = await marcasAPI.create(payloadParaBackend);
            
            if (response && response.status >= 200 && response.status < 300) {
                toast.success(response.data.message || "Marca cadastrada com sucesso!");
                // 4. Usar a função de navegação limpa
                handleNavigation("/"); 
            } else {
                 toast.error(`Erro ao cadastrar marca.`);
            }
        } catch (error) {
            console.error("Erro na requisição da marca:", error);
            toast.error("Erro ao conectar com o servidor.");
        }
    };

    // --- JSX (Marcações) ---
    return (
        <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-4">
                {/* 5. Usar a função de navegação limpa */}
                <Button variant="ghost" size="icon" onClick={() => handleNavigation("/marcas")} className="hover:bg-gray-200">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova Marca</h1>
                    <p className="text-gray-500">Cadastre uma nova marca de produto</p>
                </div>
            </div>
            
            {/* ... restante do formulário é o mesmo ... */}
            <Card className="bg-white shadow-xl border border-gray-200 max-w-3xl mx-auto rounded-lg">
                <CardHeader className="border-b p-6">
                    <CardTitle className="text-gray-800 text-xl">Dados da Marca</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            
                            {/* 1. nome_marca (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="nome_marca" className="font-medium text-gray-700">Nome da Marca</Label>
                                <Input 
                                    id="nome_marca" 
                                    placeholder="Ex: Marca Alfa" 
                                    required 
                                    value={marcaData.nome_marca}
                                    onChange={(e) => handleChange("nome_marca", e.target.value)}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* 2. pais_origem (String, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="pais_origem" className="font-medium text-gray-700">País de Origem</Label>
                                <Input 
                                    id="pais_origem" 
                                    placeholder="Ex: Brasil, EUA" 
                                    required 
                                    value={marcaData.pais_origem}
                                    onChange={(e) => handleChange("pais_origem", e.target.value)}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* 3. status (boolean, required) */}
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="status_marca" className="font-medium text-gray-700">Status</Label>
                                <Select required 
                                    value={String(marcaData.status)} // Converte boolean para string para o Select
                                    onValueChange={handleSelectChange("status")}
                                >
                                    <SelectTrigger id="status_marca" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                                        <SelectValue placeholder="Selecione o status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Ativa</SelectItem>
                                        <SelectItem value="false">Inativa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Campo vazio para alinhar o grid */}
                            <div className="hidden md:block"></div> 

                            {/* 4. descricao_marca (String, optional) */}
                            <div className="space-y-2 col-span-full">
                                <Label htmlFor="descricao_marca" className="font-medium text-gray-700">Descrição</Label>
                                <Textarea 
                                    id="descricao_marca" 
                                    placeholder="Detalhes sobre a marca, histórico ou observações." 
                                    rows={3}
                                    value={marcaData.descricao_marca}
                                    onChange={(e) => handleChange("descricao_marca", e.target.value)}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                // 6. Usar a função de navegação limpa
                                onClick={() => handleNavigation("/marcas")}
                                className="hover:bg-gray-100 border-gray-300 text-gray-700"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md">
                                Cadastrar Marca
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default App;