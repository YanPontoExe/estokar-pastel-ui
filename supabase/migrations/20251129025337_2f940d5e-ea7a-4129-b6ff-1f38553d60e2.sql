-- Fix search_path for stock update functions
CREATE OR REPLACE FUNCTION public.atualizar_estoque_entrada()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.materiais
  SET quantidade_estoque = quantidade_estoque + NEW.quantidade
  WHERE id = NEW.cod_material;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.atualizar_estoque_saida()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.materiais
  SET quantidade_estoque = quantidade_estoque - NEW.quantidade
  WHERE id = NEW.cod_material;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;