"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useInfiniteMissingPersons } from "@/services/people/service"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { isLocalized } from "@/lib/utils"
export function ChartsSection() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteMissingPersons(
    { porPagina: 100 },
    { staleTime: 1000 * 60 * 5 } // 5 minutos de cache
  )

  // Usando useMemo para processar os dados e evitar reprocessamentos desnecessários
  const { 
    genderData, 
    ageData, 
    statusData, 
    totalLoaded,
    totalAvailable
  } = useMemo(() => {
    // Default empty data
    if (!data?.pages?.length) {
      return {
        genderData: [],
        ageData: [],
        statusData: [],
        totalLoaded: 0,
        totalAvailable: 0
      }
    }

    // Junta todas as pessoas de todas as páginas carregadas
    const allPeople = data.pages.flatMap(page => page.content)
    const totalLoaded = allPeople.length
    const totalAvailable = data.pages[0]?.totalElements || 0

    // Processamento de dados por gênero
    const genderCount = {
      MASCULINO: 0,
      FEMININO: 0
    }

    // Processamento de dados por idade
    const ageGroups = {
      "0-12": 0,
      "13-17": 0,
      "18-25": 0,
      "26-40": 0,
      "41-59": 0,
      "60+": 0
    }

    // Processamento de dados por status
    const statusCount = {
      encontrado: 0,
      desaparecido: 0
    }

    // Processa os dados
    allPeople.forEach(pessoa => {
      // Contagem por gênero
      if (pessoa.sexo) {
        genderCount[pessoa.sexo]++
      }

      // Contagem por idade
      const idade = pessoa.idade
      if (idade !== undefined) {
        if (idade <= 12) ageGroups["0-12"]++
        else if (idade <= 17) ageGroups["13-17"]++
        else if (idade <= 25) ageGroups["18-25"]++
        else if (idade <= 40) ageGroups["26-40"]++
        else if (idade <= 59) ageGroups["41-59"]++
        else ageGroups["60+"]++
      }
      const isFound = isLocalized(pessoa)
      // Contagem por status
      if (isFound) {
        statusCount.encontrado++
      } else {
        statusCount.desaparecido++
      }
    })

    // Formata os dados para os gráficos
    const genderData = [
      { name: "Masculino", value: genderCount.MASCULINO, fill: "#3b82f6" },
      { name: "Feminino", value: genderCount.FEMININO, fill: "#ec4899" }
    ]

    const ageData = Object.entries(ageGroups).map(([range, count]) => ({
      name: range,
      value: count,
      fill: "#8884d8"
    }))

    const statusData = [
      { name: "Desaparecido", value: statusCount.desaparecido, fill: "#ef4444" },
      { name: "Encontrado", value: statusCount.encontrado, fill: "#22c55e" }
    ]

    return {
      genderData,
      ageData,
      statusData,
      totalLoaded,
      totalAvailable
    }

  }, [data]) // Dependência apenas nos dados, recalcula só quando os dados mudam

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : "Erro ao carregar dados estatísticos"}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">
          Análise baseada em <span className="font-medium">{totalLoaded}</span> de <span className="font-medium">{totalAvailable}</span> registros
          {data?.pages && data.pages.length > 1 && (
            <span className="ml-1">({data.pages.length} páginas carregadas)</span>
          )}
        </div>
        
        {hasNextPage && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando
              </>
            ) : (
              "Carregar mais dados"
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Gênero</CardTitle>
            <CardDescription>Proporção de pessoas desaparecidas por gênero</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} pessoas`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Casos</CardTitle>
            <CardDescription>Pessoas desaparecidas vs. localizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} pessoas`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de distribuição por faixa etária */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distribuição por Faixa Etária</CardTitle>
            <CardDescription>Casos por grupos de idade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} pessoas`, 'Quantidade']} />
                  <Legend />
                  <Bar dataKey="value" name="Pessoas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {isFetching && !isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
} 