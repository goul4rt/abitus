import { SlidersHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SearchFiltersProps } from "./types";

export default function SearchFilters({
  filters,
  showFilters,
  onFilterChange,
  onSearch,
  onToggleFilters,
  renderViewModeSelector,
}: SearchFiltersProps) {
  return (
    <Card className="mb-8 border-t-4 border-t-primary">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mb-4 mb-2">
          <h2 className="text-lg font-medium">Buscar Pessoas</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={onToggleFilters}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </Button>
            {renderViewModeSelector}
          </div>
        </div>

        <form onSubmit={onSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center w-full gap-2">
            <Input
              placeholder="Buscar por nome..."
              value={filters.nome}
              onChange={(e) => onFilterChange("nome", e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="faixaIdade" className="text-sm font-medium">
                  Faixa Etária
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="faixaIdadeInicial"
                    placeholder="De"
                    type="number"
                    min="0"
                    value={filters.faixaIdadeInicial}
                    onChange={(e) =>
                      onFilterChange("faixaIdadeInicial", e.target.value)
                    }
                  />
                  <Input
                    id="faixaIdadeFinal"
                    placeholder="Até"
                    type="number"
                    min="0"
                    value={filters.faixaIdadeFinal}
                    onChange={(e) =>
                      onFilterChange("faixaIdadeFinal", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="sexo" className="text-sm font-medium">
                  Sexo
                </label>
                <Select
                  value={filters.sexo}
                  onValueChange={(value) => onFilterChange("sexo", value)}
                >
                  <SelectTrigger id="sexo">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODOS">Todos</SelectItem>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="FEMININO">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => onFilterChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DESAPARECIDO">Desaparecido</SelectItem>
                    <SelectItem value="LOCALIZADO">Localizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
