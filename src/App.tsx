import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Materiais from "./pages/Materiais";
import NovoMaterial from "./pages/NovoMaterial";
import Funcionarios from "./pages/Funcionarios";
import Usuarios from "./pages/Usuarios";
import Marcas from "./pages/Marcas";
import Entradas from "./pages/Entradas";
import Saidas from "./pages/Saidas";
import Setores from "./pages/Setores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/materiais" element={<Layout><Materiais /></Layout>} />
          <Route path="/materiais/novo" element={<Layout><NovoMaterial /></Layout>} />
          <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
          <Route path="/usuarios" element={<Layout><Usuarios /></Layout>} />
          <Route path="/marcas" element={<Layout><Marcas /></Layout>} />
          <Route path="/entradas" element={<Layout><Entradas /></Layout>} />
          <Route path="/saidas" element={<Layout><Saidas /></Layout>} />
          <Route path="/setores" element={<Layout><Setores /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
