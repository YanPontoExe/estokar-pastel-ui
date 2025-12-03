import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// 💥 Corrigindo potenciais problemas de caminhos de importação e consistência de nomeação
// NOTA: É fundamental que os nomes dos arquivos (e o case) correspondam exatamente aos nomes
// usados na importação, por exemplo, "novaMarca" vs "NovaMarca".

// Componentes de Páginas
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Materiais from "./pages/Materiais";
import Funcionarios from "./pages/Funcionarios";
import NovoFuncionario from "./pages/NovoFuncionario";
import Usuarios from "./pages/Usuarios";
import Marcas from "./pages/Marcas";
import Entradas from "./pages/Entradas";
import Saidas from "./pages/Saidas";
import Setores from "./pages/Setores";
import NotFound from "./pages/NotFound";

// Componentes de Formulários (verifique se "novaMarca" é minúsculo ou maiúsculo)
import NovaMarca from "./pages/novaMarca"; // Presumindo que o nome do arquivo seja "NovaMarca.tsx"
import NovoMaterial from "./pages/NovoMaterial";
import NovaEntrada from "./pages/NovaEntrada"; // Componente que precisa da prop navigateTo

// Componentes de Layout e Roteamento
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import NovaSaida from "./pages/NovaSaida";

//componentes de Layout  de setor
import NovoSetor from "./pages/NovoSetor";


const queryClient = new QueryClient();

/**
 * Componente que define todas as rotas e usa o hook useNavigate.
 * Este componente deve ser renderizado DENTRO do BrowserRouter.
 */
const AppRoutes = () => {
  // O hook useNavigate só pode ser chamado dentro do BrowserRouter
  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      
      {/* Rotas de Materiais */}
      <Route path="/materiais" element={<ProtectedRoute><Layout><Materiais /></Layout></ProtectedRoute>} />
      <Route path="/materiais/novo" element={<ProtectedRoute><Layout><NovoMaterial /></Layout></ProtectedRoute>} />
      
      {/* Rotas de Funcionários */}
      <Route path="/funcionarios" element={<ProtectedRoute><Layout><Funcionarios /></Layout></ProtectedRoute>} />
      <Route path="/funcionarios/novo" element={<ProtectedRoute><Layout><NovoFuncionario /></Layout></ProtectedRoute>} />
      
      {/* Rotas de Usuários e Setores */}
      <Route path="/usuarios" element={<ProtectedRoute><Layout><Usuarios /></Layout></ProtectedRoute>} />
      <Route path="/setores" element={<ProtectedRoute><Layout><Setores /></Layout></ProtectedRoute>} />
      
      {/* Rotas de Marcas */}
      <Route path="/marcas" element={<ProtectedRoute><Layout><Marcas /></Layout></ProtectedRoute>} />
      <Route path="/marcas/nova" element={<ProtectedRoute><Layout><NovaMarca /></Layout></ProtectedRoute>} />
      
      {/* Rotas de Movimentação (Entradas e Saídas) */}
      <Route path="/entradas" element={<ProtectedRoute><Layout><Entradas /></Layout></ProtectedRoute>} />
      <Route path="/saidas" element={<ProtectedRoute><Layout><Saidas /></Layout></ProtectedRoute>} />
      <Route path="/saidas/nova" element={<ProtectedRoute><Layout><NovaSaida navigateTo={navigateTo} /></Layout></ProtectedRoute>} />
      
      {/* Rota de Nova Entrada (Passando a prop 'navigateTo' para resolver o erro anterior) */}
      <Route 
        path="/entrada/nova" 
        element={<ProtectedRoute><Layout><NovaEntrada navigateTo={navigateTo} /></Layout></ProtectedRoute>} 
      />

      {/* Rota de Novo Setor (Passando a prop 'navigateTo') */}
      <Route 
        path="/setores/novo" 
        element={<ProtectedRoute><Layout><NovoSetor navigateTo={navigateTo} /></Layout></ProtectedRoute>} 
      />
      
      {/* Rota de Not Found (Catch-all) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/**
 * Componente principal que define os Context Providers e o BrowserRouter.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Renderiza AppRoutes aqui para que useNavigate funcione */}
        <AppRoutes /> 
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;