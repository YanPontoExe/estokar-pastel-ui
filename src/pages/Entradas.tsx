import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Entradas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["movimentacoes_entrada"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movimentacoes_entrada")
        .select(`
          *,
          materiais (codigo, descricao),
          fornecedores (nome_fornecedor),
          profiles!movimentacoes_entrada_cod_usuario_fkey (username)
        `)
        .order("data_entrada", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredEntries = entries.filter((entry) =>
    entry.materiais?.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.materiais?.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entradas</h1>
          <p className="text-muted-foreground">Registre e visualize entradas de materiais</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Entrada
        </Button>
      </div>

      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Histórico de Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por material ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Data</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Nota Fiscal</TableHead>
                  <TableHead>Observação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhuma entrada encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/30">
                      <TableCell>{new Date(entry.data_entrada).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="font-medium">{entry.materiais?.codigo}</TableCell>
                      <TableCell>{entry.materiais?.descricao}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-primary text-primary-foreground">
                          +{entry.quantidade}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.fornecedores?.nome_fornecedor || "-"}</TableCell>
                      <TableCell>{entry.nota_fiscal || "-"}</TableCell>
                      <TableCell>{entry.observacoes || "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Entradas;
