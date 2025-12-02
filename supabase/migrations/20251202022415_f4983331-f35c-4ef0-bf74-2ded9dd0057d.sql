-- Remover trigger e políticas existentes
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON public.usuarios;
DROP POLICY IF EXISTS "Todos podem fazer login (select público)" ON public.usuarios;
DROP POLICY IF EXISTS "Admins podem inserir usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Admins podem atualizar usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Admins podem deletar usuarios" ON public.usuarios;

-- Recriar tabela usuarios simplificada
DROP TABLE IF EXISTS public.usuarios CASCADE;

CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Habilitar RLS (permite cadastro público e login)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (cadastro)
CREATE POLICY "Qualquer um pode se cadastrar"
  ON public.usuarios
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir leitura pública (login/autenticação)
CREATE POLICY "Qualquer um pode fazer login"
  ON public.usuarios
  FOR SELECT
  USING (true);

-- Política para atualização (apenas próprio usuário - futuro)
CREATE POLICY "Usuarios podem atualizar própria senha"
  ON public.usuarios
  FOR UPDATE
  USING (true);

COMMENT ON TABLE public.usuarios IS 'Tabela simplificada de usuários: apenas username e password_hash para autenticação via Spring Boot';