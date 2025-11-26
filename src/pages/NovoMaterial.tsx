import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const NovoMaterial = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Material cadastrado com sucesso!");
    navigate("/materiais");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/materiais")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Material</h1>
          <p className="text-muted-foreground">Cadastre um novo material no estoque</p>
        </div>
      </div>

      <Card className="bg-gradient-card border-border max-w-3xl">
        <CardHeader>
          <CardTitle className="text-card-foreground">Informações do Material</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input id="code" placeholder="EX: MAT-001" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome do Material</Label>
                <Input id="name" placeholder="Ex: Parafuso M10" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Select required>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marca-a">Marca A</SelectItem>
                    <SelectItem value="marca-b">Marca B</SelectItem>
                    <SelectItem value="marca-c">Marca C</SelectItem>
                    <SelectItem value="marca-d">Marca D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Setor</Label>
                <Select required>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setor-1">Almoxarifado</SelectItem>
                    <SelectItem value="setor-2">Produção</SelectItem>
                    <SelectItem value="setor-3">Manutenção</SelectItem>
                    <SelectItem value="setor-4">Expedição</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qty">Quantidade</Label>
                <Input id="qty" type="number" placeholder="0" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
                <Select required>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="un">UN - Unidade</SelectItem>
                    <SelectItem value="kg">KG - Quilograma</SelectItem>
                    <SelectItem value="l">L - Litro</SelectItem>
                    <SelectItem value="m">M - Metro</SelectItem>
                    <SelectItem value="cx">CX - Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-qty">Estoque Mínimo</Label>
                <Input id="min-qty" type="number" placeholder="0" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Ex: Prateleira A-3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Informações adicionais sobre o material..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/materiais")}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Cadastrar Material
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoMaterial;
