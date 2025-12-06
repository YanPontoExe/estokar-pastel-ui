import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { marcasAPI } from "@/services/api";

// 🚨 IMPORTANTE: SUBSTITUA PELA URL REAL DO SEU BACKEND
    const API_URL = "http://localhost:8080/Marca"; 

    // ⭐ Interface para o ESTADO do Componente (Select retorna string '1' ou '0')
    interface FormMarcaState {
    nome_marca: string;
    pais_origem: string;
    descricao_marca: string;
    status: string;
    dataCadastro: string;
    }

    // ⭐ Interface para o PAYLOAD ENVIADO ao Backend (status deve ser number INT)
    interface FormMarcaPayload {
    nome_marca: string;
    pais_origem: string;
    descricao_marca: string;
    status: string;
    dataCadastro: string;
    }

    // ✅ Componente principal
    const App = () => {
      const handleNavigation = (path: string) => {
        console.log(`Navegação limpa simulada para: ${path}`);
        const baseUrl = window.location.origin;
        window.location.replace(`${baseUrl}${path}`);
      };
      
      // Usamos FormmarcaState para o useState
      const [marcaData, setMarcaData] = useState({
      nome_marca: "",
      pais_origem: "",
      descricao_marca: "",
      status: "1",
      dataCadastro: new Date().toISOString().split("T")[0],
        });

      const handleChange = (name: keyof FormMarcaState, value: string) => {
        setMarcaData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
      const handleSelectChange = (name: keyof FormMarcaState) => (value: string) => {
          handleChange(name, value);
      };

      // Função de submissão do formulário
        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            nome_marca: marcaData.nome_marca,
            pais_origem: marcaData.pais_origem,        // string
            descricao_marca: marcaData.descricao_marca, // string opcional
            status: marcaData.status === "true",        // boolean
            dataCadastro: new Date().toISOString(),    // opcional, backend pode preencher
        };
        
        try {
            await marcasAPI.create(payload);
            toast.success("marca cadastrado com sucesso!");
            handleNavigation("/marcas");
        } catch (error) {
            console.error("Erro ao cadastrar marca:", error);
            toast.error("Erro ao cadastrar marca.");
        }
        };

    // --- JSX (Marcações) ---
    return (
        <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-4">
                {/* 5. Usar a função de navegação limpa */}
                <Button variant="ghost" size="icon" onClick={() => handleNavigation("/api/Marca")} className="hover:bg-gray-200">
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

                        {/* 5. dataCadastro (Inclusão) */}
                                       <div className="space-y-2 col-span-full lg:col-span-1">
                                        <Label htmlFor="dataCadastro" className="font-medium text-gray-700">Data de Cadastro</Label>
                                        <Input 
                                            id="dataCadastro" 
                                            type="date" 
                                            readOnly 
                                            value={marcaData.dataCadastro}
                                            className="border-gray-300 bg-gray-100 cursor-default"
                                        />
                                      </div>
                        
                        <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                // 6. Usar a função de navegação limpa
                                onClick={() => handleNavigation("/api/Marca")}
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