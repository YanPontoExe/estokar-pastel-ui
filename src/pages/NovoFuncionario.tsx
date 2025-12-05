import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// O campo Textarea não é necessário, mas é mantido como importação segura
import { Textarea } from "@/components/ui/textarea"; 
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";

// 🚨 SIMULAÇÃO DE API: Definindo um mock simples de 'funcionariosAPI'
const funcionariosAPI = {
  create: (data: any) => {
    console.log("MOCK API: Tentativa de envio de dados de funcionário:", data);
    return Promise.resolve({ 
      status: 201, 
      data: { message: "Funcionário cadastrado com sucesso (MOCK)." } 
    });
  },
};

// ⭐ Interface de Dados do Formulário (O campo id_funcionario foi removido)
interface FormFuncionarioData {
  status: string;
  data_contratacao: string; // Gerado automaticamente
  turno: string;
  setor: string;
  nome_funcionario: string;
}

// ✅ Componente principal para Cadastro de Funcionários
const App = () => {
  
  // 🧭 MODIFICAÇÃO CHAVE APLICADA: Usa window.location.replace para navegação limpa
  const handleNavigation = (path: string) => {
    console.log(`Navegação limpa simulada para: ${path}`);
    
    // Pega o domínio base (Ex: http://localhost:8081)
    const baseUrl = window.location.origin;
    
    // Usa window.location.replace para ir para a URL completa do destino (Ex: http://localhost:8081/funcionarios)
    // Isso substitui o caminho anterior, resolvendo o problema do URL com hash duplo.
    window.location.replace(`${baseUrl}${path}`);
  };
  
  const [funcionarioData, setFuncionarioData] = useState<FormFuncionarioData>({
    // Valores Iniciais (id_funcionario removido daqui)
    status: "",
    turno: "",
    setor: "",
    nome_funcionario: "",
    // Data de contratação é a data de hoje por padrão
    data_contratacao: new Date().toISOString().split('T')[0], 
  });

  // --- Funções de Manipulação de Estado ---

  // Função genérica para atualizar o estado ao mudar o valor
  const handleChange = (name: keyof FormFuncionarioData, value: string) => {
    setFuncionarioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Função para Select (lida com valores de string)
  const handleSelectChange = (name: keyof FormFuncionarioData) => (value: string) => {
      handleChange(name, value);
  };
  
  // --- Função de Submissão e Requisição API ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🎯 PAYLOAD FINAL: O payload é simplesmente o estado completo
    const payloadParaBackend = funcionarioData;
    
    console.log("Payload Enviado:", payloadParaBackend);

    try {
      const response = await funcionariosAPI.create(payloadParaBackend);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(response.data.message || "Funcionário cadastrado com sucesso!");
        handleNavigation("/"); // Redirecionamento simulado
      } else {
        const errorDetail = response?.data?.message || 'Detalhes desconhecidos';
        toast.error(`Erro ao cadastrar: Status ${response?.status || 'N/A'} - ${errorDetail}`);
        // Redireciona, mesmo que haja erro, para sair da tela de cadastro
        handleNavigation("/");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao conectar com o servidor ou ao cadastrar o funcionário.");
      
      // ✅ Redirecionamento forçado em caso de erro de comunicação
      handleNavigation("/funcionarios"); 
    }
  };

  // --- JSX (Marcações) ---
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/funcionarios")}
          className="hover:bg-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Funcionário</h1>
          <p className="text-gray-500">Cadastre um novo colaborador no sistema</p>
        </div>
      </div>

      <Card className="bg-white shadow-xl border border-gray-200 max-w-3xl mx-auto rounded-lg">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-gray-800 text-xl">Dados do Colaborador</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* 1. nome_funcionario */}
              <div className="space-y-2 col-span-full">
                <Label htmlFor="nome_funcionario" className="font-medium text-gray-700">Nome Completo</Label>
                <Input 
                  id="nome_funcionario" 
                  placeholder="Ex: João da Silva" 
                  required 
                  value={funcionarioData.nome_funcionario}
                  onChange={(e) => handleChange("nome_funcionario", e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 2. setor */}
              <div className="space-y-2">
                <Label htmlFor="setor" className="font-medium text-gray-700">Setor</Label>
                <Select required value={funcionarioData.setor} onValueChange={handleSelectChange("setor")}>
                  <SelectTrigger id="setor" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Producao">Produção</SelectItem>
                    <SelectItem value="Manutencao">Manutenção</SelectItem>
                    <SelectItem value="RH">Recursos Humanos</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 3. turno */}
              <div className="space-y-2">
                <Label htmlFor="turno" className="font-medium text-gray-700">Turno de Trabalho</Label>
                <Select required value={funcionarioData.turno} onValueChange={handleSelectChange("turno")}>
                  <SelectTrigger id="turno" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Selecione o turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manha">Manhã (6h - 14h)</SelectItem>
                    <SelectItem value="Tarde">Tarde (14h - 22h)</SelectItem>
                    <SelectItem value="Noite">Noite (22h - 6h)</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* 4. status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="font-medium text-gray-700">Status</Label>
                <Select required value={funcionarioData.status} onValueChange={handleSelectChange("status")}>
                  <SelectTrigger id="status" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Status atual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Ferias">Férias</SelectItem>
                    <SelectItem value="Licenca">Licença</SelectItem>
                    <SelectItem value="Desligado">Desligado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. data_contratacao - ReadOnly, valor gerado no useState */}
               <div className="space-y-2">
                <Label htmlFor="data_contratacao" className="font-medium text-gray-700">Data de Contratação</Label>
                <Input 
                    id="data_contratacao" 
                    type="date" 
                    readOnly 
                    value={funcionarioData.data_contratacao}
                    className="border-gray-300 bg-gray-100 cursor-default"
                />
              </div>

            </div>
            
            <div className="flex gap-4 justify-end pt-4 border-t border-gray-100 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleNavigation("/funcionarios")}
                className="hover:bg-gray-100 border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md">
                Cadastrar Funcionário
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;