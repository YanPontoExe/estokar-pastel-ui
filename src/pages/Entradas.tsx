import { useState, useEffect } from "react";
import { entradasAPI } from "@/services/api";
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
import { useNavigate } from "react-router-dom";

const Entradas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const data = await entradasAPI.getAll();
      setEntries(data);
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntries = entries.filter((entry) =>
    String(entry.cod_fornecedor).includes(searchTerm) ||
    String(entry.quantidade).includes(searchTerm) ||
    String(entry.cod_material).includes(searchTerm)
);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entradas</h1>
          <p className="text-muted-foreground">Registre e visualize entradas de materiais</p>
        </div>
        <Button onClick={() => navigate("/entrada/nova")} className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                  <TableHead>Codigo do Material</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Código do Fornecedor</TableHead>
                  <TableHead>Nota Fiscal</TableHead>
                  <TableHead>Data de Entrada</TableHead>
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
                      <TableCell className="font-medium">{entry.cod_material}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary text-primary-foreground">
                          +{entry.quantidade}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-12">{entry.cod_fornecedor || "-"}</TableCell>
                      <TableCell>{entry.notaFiscal || "-"}</TableCell>
                      <TableCell>{new Date(entry.dataEntrada).toLocaleDateString('pt-BR')}</TableCell>
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
