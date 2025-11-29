-- Create enum types
CREATE TYPE public.turno_type AS ENUM ('Manhã', 'Tarde', 'Noite');
CREATE TYPE public.motivo_saida_type AS ENUM ('venda', 'transferência', 'devolução', 'uso interno', 'descarte');

-- Create setores table
CREATE TABLE public.setores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  descricao TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.setores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all setores"
  ON public.setores FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert setores"
  ON public.setores FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update setores"
  ON public.setores FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete setores"
  ON public.setores FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create fornecedores table
CREATE TABLE public.fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_fornecedor TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  contato TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all fornecedores"
  ON public.fornecedores FOR SELECT
  USING (true);

CREATE POLICY "Admins and managers can insert fornecedores"
  ON public.fornecedores FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins and managers can update fornecedores"
  ON public.fornecedores FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins can delete fornecedores"
  ON public.fornecedores FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create funcionarios table
CREATE TABLE public.funcionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cod_setor UUID REFERENCES public.setores(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  turno turno_type NOT NULL,
  data_contratacao DATE NOT NULL DEFAULT CURRENT_DATE,
  status BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all funcionarios"
  ON public.funcionarios FOR SELECT
  USING (true);

CREATE POLICY "Admins and managers can insert funcionarios"
  ON public.funcionarios FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins and managers can update funcionarios"
  ON public.funcionarios FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins can delete funcionarios"
  ON public.funcionarios FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create marcas table
CREATE TABLE public.marcas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_marca TEXT NOT NULL,
  pais_origem TEXT,
  descricao TEXT,
  status BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.marcas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all marcas"
  ON public.marcas FOR SELECT
  USING (true);

CREATE POLICY "Admins and managers can insert marcas"
  ON public.marcas FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins and managers can update marcas"
  ON public.marcas FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins can delete marcas"
  ON public.marcas FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create materiais table
CREATE TABLE public.materiais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL UNIQUE,
  descricao TEXT NOT NULL,
  cod_marca UUID REFERENCES public.marcas(id) ON DELETE SET NULL,
  cod_fornecedor UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  quantidade_estoque INTEGER DEFAULT 0 NOT NULL,
  unidade TEXT NOT NULL,
  estoque_minimo INTEGER DEFAULT 0 NOT NULL,
  localizacao TEXT,
  status BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.materiais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all materiais"
  ON public.materiais FOR SELECT
  USING (true);

CREATE POLICY "Admins, managers and operators can insert materiais"
  ON public.materiais FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente') OR has_role(auth.uid(), 'operador'));

CREATE POLICY "Admins, managers and operators can update materiais"
  ON public.materiais FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente') OR has_role(auth.uid(), 'operador'));

CREATE POLICY "Admins can delete materiais"
  ON public.materiais FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create movimentacoes_entrada table
CREATE TABLE public.movimentacoes_entrada (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cod_material UUID REFERENCES public.materiais(id) ON DELETE CASCADE NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  cod_fornecedor UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  nota_fiscal TEXT,
  cod_usuario UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  data_entrada TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.movimentacoes_entrada ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all movimentacoes_entrada"
  ON public.movimentacoes_entrada FOR SELECT
  USING (true);

CREATE POLICY "Admins, managers and operators can insert movimentacoes_entrada"
  ON public.movimentacoes_entrada FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente') OR has_role(auth.uid(), 'operador'));

CREATE POLICY "Admins and managers can update movimentacoes_entrada"
  ON public.movimentacoes_entrada FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins can delete movimentacoes_entrada"
  ON public.movimentacoes_entrada FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create movimentacoes_saida table
CREATE TABLE public.movimentacoes_saida (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cod_material UUID REFERENCES public.materiais(id) ON DELETE CASCADE NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  cod_funcionario UUID REFERENCES public.funcionarios(id) ON DELETE SET NULL,
  motivo motivo_saida_type NOT NULL,
  cod_usuario UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  data_saida TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.movimentacoes_saida ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all movimentacoes_saida"
  ON public.movimentacoes_saida FOR SELECT
  USING (true);

CREATE POLICY "Admins, managers and operators can insert movimentacoes_saida"
  ON public.movimentacoes_saida FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente') OR has_role(auth.uid(), 'operador'));

CREATE POLICY "Admins and managers can update movimentacoes_saida"
  ON public.movimentacoes_saida FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'gerente'));

CREATE POLICY "Admins can delete movimentacoes_saida"
  ON public.movimentacoes_saida FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_setores_updated_at
  BEFORE UPDATE ON public.setores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fornecedores_updated_at
  BEFORE UPDATE ON public.fornecedores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_funcionarios_updated_at
  BEFORE UPDATE ON public.funcionarios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marcas_updated_at
  BEFORE UPDATE ON public.marcas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_materiais_updated_at
  BEFORE UPDATE ON public.materiais
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_funcionarios_cod_setor ON public.funcionarios(cod_setor);
CREATE INDEX idx_materiais_cod_marca ON public.materiais(cod_marca);
CREATE INDEX idx_materiais_cod_fornecedor ON public.materiais(cod_fornecedor);
CREATE INDEX idx_movimentacoes_entrada_cod_material ON public.movimentacoes_entrada(cod_material);
CREATE INDEX idx_movimentacoes_entrada_data ON public.movimentacoes_entrada(data_entrada);
CREATE INDEX idx_movimentacoes_saida_cod_material ON public.movimentacoes_saida(cod_material);
CREATE INDEX idx_movimentacoes_saida_data ON public.movimentacoes_saida(data_saida);

-- Create function to update material stock on entrada
CREATE OR REPLACE FUNCTION public.atualizar_estoque_entrada()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.materiais
  SET quantidade_estoque = quantidade_estoque + NEW.quantidade
  WHERE id = NEW.cod_material;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_atualizar_estoque_entrada
  AFTER INSERT ON public.movimentacoes_entrada
  FOR EACH ROW EXECUTE FUNCTION public.atualizar_estoque_entrada();

-- Create function to update material stock on saida
CREATE OR REPLACE FUNCTION public.atualizar_estoque_saida()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.materiais
  SET quantidade_estoque = quantidade_estoque - NEW.quantidade
  WHERE id = NEW.cod_material;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_atualizar_estoque_saida
  AFTER INSERT ON public.movimentacoes_saida
  FOR EACH ROW EXECUTE FUNCTION public.atualizar_estoque_saida();