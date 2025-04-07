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
  viewMode,
  setViewMode,
  renderViewModeIcon,
}: ViewModeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {renderViewModeIcon()}
          <span className="ml-2 hidden sm:inline">Visualização</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setViewMode("grid")}>
          <Grid className="mr-2 h-4 w-4" />
          <span>Grid</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setViewMode("list")}>
          <List className="mr-2 h-4 w-4" />
          <span>Lista</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setViewMode("table")}>
          <Table2 className="mr-2 h-4 w-4" />
          <span>Tabela</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ViewModeTabs({ viewMode, setViewMode }: ViewModeTabsProps) {
  return (
    <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
      <TabsList className="w-full md:w-auto">
        <TabsTrigger value="grid" className="flex items-center">
          <Grid className="mr-2 h-4 w-4" />
          <span>Grid</span>
        </TabsTrigger>
        <TabsTrigger value="list" className="flex items-center">
          <List className="mr-2 h-4 w-4" />
          <span>Lista</span>
        </TabsTrigger>
        <TabsTrigger value="table" className="flex items-center">
          <Table2 className="mr-2 h-4 w-4" />
          <span>Tabela</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
