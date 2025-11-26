import { useState } from "react";
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
import { Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Saidas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const exits = [
    { id: 1, date: "2024-01-15", material: "Parafuso M10", code: "PAR-001", qty: 50, employee: "João Silva", destination: "Produção" },
    { id: 2, date: "2024-01-15", material: "Tinta Branca 3.6L", code: "TIN-002", qty: 5, employee: "Maria Santos", destination: "Manutenção" },
    { id: 3, date: "2024-01-14", material: "Lixa Grão 120", code: "LIX-003", qty: 20, employee: "Pedro Costa", destination: "Acabamento" },
    { id: 4, date: "2024-01-14", material: "Cola PVA 1kg", code: "COL-004", qty: 8, employee: "Ana Oliveira", destination: "Produção" },
    { id: 5, date: "2024-01-13", material: "Prego 18x30", code: "PRE-005", qty: 100, employee: "João Silva", destination: "Construção" },
  ];

  const filteredExits = exits.filter((exit) =>
    exit.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exit.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saídas</h1>
          <p className="text-muted-foreground">Registre e visualize saídas de materiais</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                  <TableHead>Data</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Destino</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExits.map((exit) => (
                  <TableRow key={exit.id} className="hover:bg-muted/30">
                    <TableCell>{new Date(exit.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{exit.code}</TableCell>
                    <TableCell>{exit.material}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                        -{exit.qty}
                      </Badge>
                    </TableCell>
                    <TableCell>{exit.employee}</TableCell>
                    <TableCell>{exit.destination}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Saidas;
