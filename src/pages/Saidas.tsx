import { useState, useEffect } from "react";
import { saidasAPI } from "@/services/api";
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

const Saidas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [exits, setExits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExits();
  }, []);

  const fetchExits = async () => {
    try {
      setIsLoading(true);
      const data = await saidasAPI.getAll();
      setExits(data);
    } catch (error) {
      console.error("Erro ao carregar saídas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExits = exits.filter((exit) =>
    String(exit.motivo).includes(searchTerm) ||
    String(exit.cod_funcionario).includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saídas</h1>
          <p className="text-muted-foreground">Registre e visualize saídas de materiais</p>
        </div>
        <Button onClick={() => navigate("/saidas/nova")}  className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Saída
        </Button>
      </div>

      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Histórico de Saídas</CardTitle>
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
                  <TableHead>Código do Funcionario</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Data de Saída</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : filteredExits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhuma saída encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExits.map((exit) => (
                    <TableRow key={exit.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{exit.cod_material}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary text-primary-foreground">
                          -{exit.quantidade}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-12">{exit.cod_funcionario || "-"}</TableCell>
                      <TableCell>{exit.motivo || "-"}</TableCell>
                      <TableCell>{new Date(exit.data_saida).toLocaleDateString('pt-BR')}</TableCell>
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

export default Saidas;
