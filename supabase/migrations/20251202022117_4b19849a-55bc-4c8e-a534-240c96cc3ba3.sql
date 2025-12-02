-- Criar tabela usuarios para autenticação via Spring Boot
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role public.app_role NOT NULL DEFAULT 'operador',
  status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Todos podem fazer login (select público)"
  ON public.usuarios
  FOR SELECT
  USING (true);

CREATE POLICY "Admins podem inserir usuarios"
  ON public.usuarios
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar usuarios"
  ON public.usuarios
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar usuarios"
  ON public.usuarios
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at
  BEFORE UPDATE ON public.usuarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Atualizar foreign keys das tabelas de movimentação para usar usuarios ao invés de profiles
-- Primeiro, adicionar coluna temporária
ALTER TABLE public.movimentacoes_entrada 
  ADD COLUMN IF NOT EXISTS cod_usuario_temp UUID REFERENCES public.usuarios(id);

ALTER TABLE public.movimentacoes_saida 
  ADD COLUMN IF NOT EXISTS cod_usuario_temp UUID REFERENCES public.usuarios(id);

COMMENT ON TABLE public.usuarios IS 'Tabela de usuários gerenciada pelo Spring Boot para autenticação com username/password';