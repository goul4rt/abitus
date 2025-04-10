import { Grid, List, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewModeSelectorProps, ViewModeTabsProps } from "./types";

export function ViewModeDropdown({
  setViewMode,
  renderViewModeIcon,
}: Omit<ViewModeSelectorProps, "viewMode">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          aria-label="Selecionar modo de visualização"
          aria-haspopup="true"
        >
          {renderViewModeIcon()}
          <span className="ml-2" aria-label="Texto de visualização" aria-live="polite">Visualização</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Opções de visualização">
        <DropdownMenuItem 
          onClick={() => setViewMode("grid")}
          aria-label="Visualizar em grid"
        >
          <Grid className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Modo grid" aria-live="polite">Grid</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setViewMode("list")}
          aria-label="Visualizar em lista"
        >
          <List className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Modo lista" aria-live="polite">Lista</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setViewMode("table")}
          aria-label="Visualizar em tabela"
        >
          <Table2 className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Modo tabela" aria-live="polite">Tabela</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ViewModeTabs({ viewMode, setViewMode }: ViewModeTabsProps) {
  return (
    <Tabs 
      value={viewMode} 
      onValueChange={setViewMode} 
      className="mb-6"
      aria-label="Modos de visualização"
    >
      <TabsList className="w-full md:w-auto" role="tablist">
        <TabsTrigger 
          value="grid" 
          className="flex items-center"
          role="tab"
          aria-selected={viewMode === "grid"}
          aria-controls="grid-view-panel"
          aria-label="Visualização em grid"
        >
          <Grid className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Visualização em grid" aria-live="polite">Grid</span>
        </TabsTrigger>
        <TabsTrigger 
          value="list" 
          className="flex items-center"
          role="tab"
          aria-selected={viewMode === "list"}
          aria-controls="list-view-panel"
          aria-label="Visualização em lista"
        >
          <List className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Visualização em lista" aria-live="polite">Lista</span>
        </TabsTrigger>
        <TabsTrigger 
          value="table" 
          className="flex items-center"
          role="tab"
          aria-selected={viewMode === "table"}
          aria-controls="table-view-panel"
          aria-label="Visualização em tabela"
        >
          <Table2 className="mr-2 h-4 w-4" aria-hidden="true" />
          <span aria-label="Visualização em tabela" aria-live="polite">Tabela</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
