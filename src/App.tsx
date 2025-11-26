import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Materiais from "./pages/Materiais";
import NovoMaterial from "./pages/NovoMaterial";
import Funcionarios from "./pages/Funcionarios";
import Usuarios from "./pages/Usuarios";
import Marcas from "./pages/Marcas";
import Entradas from "./pages/Entradas";
import Saidas from "./pages/Saidas";
import Setores from "./pages/Setores";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/materiais" element={<ProtectedRoute><Layout><Materiais /></Layout></ProtectedRoute>} />
          <Route path="/materiais/novo" element={<ProtectedRoute><Layout><NovoMaterial /></Layout></ProtectedRoute>} />
          <Route path="/funcionarios" element={<ProtectedRoute><Layout><Funcionarios /></Layout></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><Layout><Usuarios /></Layout></ProtectedRoute>} />
          <Route path="/marcas" element={<ProtectedRoute><Layout><Marcas /></Layout></ProtectedRoute>} />
          <Route path="/entradas" element={<ProtectedRoute><Layout><Entradas /></Layout></ProtectedRoute>} />
          <Route path="/saidas" element={<ProtectedRoute><Layout><Saidas /></Layout></ProtectedRoute>} />
          <Route path="/setores" element={<ProtectedRoute><Layout><Setores /></Layout></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
