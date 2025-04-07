"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, BarChart2, Grid, List, Table2, LayoutGrid, SlidersHorizontal } from "lucide-react"
import PersonCard from "@/components/person-card"
import PersonListItem from "@/components/person-list-item"
import PersonTable from "@/components/person-table"
import StatsCounter from "@/components/stats-counter"
import { useMissingPersons } from "@/services/people"
import { useStats } from "@/services/statistics"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import generateJsonLd from "@/app/json-ld"
import { StatsResponse } from "@/services/statistics/types"

export default function Home() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState("table")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    sexo: "",
    status: "DESAPARECIDO",
  })
  const [currentPage, setCurrentPage] = useState(0)

  const { data: stats = { quantPessoasDesaparecidas: 0, quantPessoasEncontradas: 0 } } = useStats()

  const { data: missingPersonsData, isLoading } = useMissingPersons({
    ...filters,
    pagina: currentPage,
    porPagina: 10,
  })

  const persons = missingPersonsData?.content || []
  const totalPages = missingPersonsData?.totalPages || 0

  useEffect(() => {
    if (!missingPersonsData && !isLoading) {
      console.error("Failed to load missing persons")
    }
  }, [missingPersonsData, isLoading])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(0)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const renderViewModeIcon = () => {
    switch (viewMode) {
      case "grid":
        return <Grid className="h-4 w-4" />
      case "list":
        return <List className="h-4 w-4" />
      case "table":
        return <Table2 className="h-4 w-4" />
      default:
        return <LayoutGrid className="h-4 w-4" />
    }
  }

  const renderPersonsList = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square relative">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    if (persons.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Nenhuma pessoa encontrada</h3>
          <p className="text-muted-foreground mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )
    }

    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {persons.map((person: any) => (
              <PersonCard key={person.id} person={person} onClick={() => router.push(`/person/${person.id}`)} />
            ))}
          </div>
        )
      case "list":
        return (
          <div className="space-y-4">
            {persons.map((person: any) => (
              <PersonListItem key={person.id} person={person} onClick={() => router.push(`/person/${person.id}`)} />
            ))}
          </div>
        )
      case "table":
        return <PersonTable persons={persons} onRowClick={(id: string) => router.push(`/person/${id}`)} />
      default:
        return null
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd("home")),
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Pessoas Desaparecidas</h1>
          <p className="text-muted-foreground mt-1">Polícia Judiciária Civil de Mato Grosso</p>
        </div>
        <Button onClick={() => router.push("/dashboard")} variant="outline" className="shrink-0">
          <BarChart2 className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>

      <StatsCounter missingCount={stats.quantPessoasDesaparecidas} foundCount={stats.quantPessoasEncontradas} />

      <Card className="mb-8 border-t-4 border-t-primary">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Buscar Pessoas</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </Button>

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
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Buscar por nome..."
                value={filters.nome}
                onChange={(e) => handleFilterChange("nome", e.target.value)}
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
                      onChange={(e) => handleFilterChange("faixaIdadeInicial", e.target.value)}
                    />
                    <Input
                      id="faixaIdadeFinal"
                      placeholder="Até"
                      type="number"
                      min="0"
                      value={filters.faixaIdadeFinal}
                      onChange={(e) => handleFilterChange("faixaIdadeFinal", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="sexo" className="text-sm font-medium">
                    Sexo
                  </label>
                  <Select value={filters.sexo} onValueChange={(value) => handleFilterChange("sexo", value)}>
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
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
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

      {renderPersonsList()}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {[...Array(totalPages)]
              .map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i)}
                    isActive={currentPage === i}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
              .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 3))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  )
}