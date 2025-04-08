"use client";

import { useCallback, useMemo, useState } from "react";
import { Grid, List, Table2, LayoutGrid } from "lucide-react";
import { useMissingPersons } from "@/services/people";
import { useStats } from "@/services/statistics";
import HeaderSection from "@/components/home/HeaderSection";
import SearchFilters from "@/components/home/SearchFilters";
import {
  ViewModeDropdown,
  ViewModeTabs,
} from "@/components/home/ViewModeSelector";
import PersonsDisplay from "@/components/home/PersonsDisplay"
import PaginationControls from "@/components/home/PaginationControls";
import generateJsonLd from "@/app/json-ld";
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    sexo: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  
  const debouncedName = useDebounce(filters.nome, 500);
  const {
    data: stats = { quantPessoasDesaparecidas: 0, quantPessoasEncontradas: 0 },
  } = useStats();

  const { data: missingPersonsData, isLoading } = useMissingPersons({
    ...filters,
    nome: debouncedName[0],
    pagina: currentPage,
    porPagina: 10,
  });

  const persons = useMemo(() => missingPersonsData?.content || [], [missingPersonsData]);
  const totalPages = useMemo(() => missingPersonsData?.totalPages || 0, [missingPersonsData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderViewModeIcon = useCallback(() => {
    switch (viewMode) {
      case "grid":
        return <Grid className="h-4 w-4" />;
      case "list":
        return <List className="h-4 w-4" />;
      case "table":
        return <Table2 className="h-4 w-4" />;
      default:
        return <LayoutGrid className="h-4 w-4" />;
    }
  }, [viewMode]);

  return (
    <main className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd("home")),
        }}
      />

      <HeaderSection
        missingCount={stats.quantPessoasDesaparecidas}
        foundCount={stats.quantPessoasEncontradas} 
        isLoading={isLoading}
      />

      <SearchFilters
        filters={filters}
        showFilters={showFilters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onToggleFilters={() => setShowFilters(!showFilters)}
        renderViewModeSelector={
          <ViewModeDropdown
            setViewMode={setViewMode}
            renderViewModeIcon={renderViewModeIcon}
          />
        }
      />

      <ViewModeTabs viewMode={viewMode} setViewMode={setViewMode} />

      <PersonsDisplay
        viewMode={viewMode}
        isLoading={isLoading}
        persons={persons}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
