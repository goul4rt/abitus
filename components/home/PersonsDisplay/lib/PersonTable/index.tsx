"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { PersonTableProps } from "./types"

export default function PersonTable({ persons, onRowClick }: PersonTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  })

  const sortedPersons = [...persons].sort((a, b) => {
    if (!sortConfig.key) return 0

    let aValue, bValue

    switch (sortConfig.key) {
      case "nome":
        aValue = a.nome?.toLowerCase() || ""
        bValue = b.nome?.toLowerCase() || ""
        break
      case "idade":
        aValue = a.idade || 0
        bValue = b.idade || 0
        break
      case "sexo":
        aValue = a.sexo || ""
        bValue = b.sexo || ""
        break
      case "data":
        aValue = new Date(a.ultimaOcorrencia?.dtDesaparecimento || 0).getTime()
        bValue = new Date(b.ultimaOcorrencia?.dtDesaparecimento || 0).getTime()
        break
      case "local":
        aValue = a.ultimaOcorrencia?.localDesaparecimentoConcat?.toLowerCase() || ""
        bValue = b.ultimaOcorrencia?.localDesaparecimentoConcat?.toLowerCase() || ""
        break
      default:
        return 0
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-1 h-4 w-4" />
    return sortConfig.direction === "ascending" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-primary" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-primary rotate-180" />
    )
  }

  const getSortDirection = (key: string) => {
    if (sortConfig.key !== key) return undefined
    return sortConfig.direction === "ascending" ? "ascending" : "descending"
  }

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-primary/10">
          <TableRow>
            <TableHead className="w-[60px] font-bold">Foto</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("nome")}
                className="p-0 h-auto font-bold flex items-center"
                aria-sort={getSortDirection("nome")}
                aria-label={`Ordenar por nome, atualmente ${getSortDirection("nome") || "não ordenado"}`}
              >
                Nome {getSortIcon("nome")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("idade")}
                className="p-0 h-auto font-bold flex items-center"
                aria-sort={getSortDirection("idade")}
                aria-label={`Ordenar por idade, atualmente ${getSortDirection("idade") || "não ordenado"}`}
              >
                Idade {getSortIcon("idade")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("sexo")}
                className="p-0 h-auto font-bold flex items-center"
                aria-sort={getSortDirection("sexo")}
                aria-label={`Ordenar por sexo, atualmente ${getSortDirection("sexo") || "não ordenado"}`}
              >
                Sexo {getSortIcon("sexo")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("data")}
                className="p-0 h-auto font-bold flex items-center"
                aria-sort={getSortDirection("data")}
                aria-label={`Ordenar por data, atualmente ${getSortDirection("data") || "não ordenado"}`}
              >
                Data {getSortIcon("data")}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button
                variant="ghost"
                onClick={() => requestSort("local")}
                className="p-0 h-auto font-bold flex items-center"
                aria-sort={getSortDirection("local")}
                aria-label={`Ordenar por local, atualmente ${getSortDirection("local") || "não ordenado"}`}
              >
                Local {getSortIcon("local")}
              </Button>
            </TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPersons.map((person, index) => {
            const isDesaparecido = !person.ultimaOcorrencia.dataLocalizacao
            const statusText = isDesaparecido ? "Desaparecido" : "Localizado"
            const statusDate = isDesaparecido
              ? formatDate(person.ultimaOcorrencia.dtDesaparecimento)
              : formatDate(person.ultimaOcorrencia.dataLocalizacao || "")

            return (
              <TableRow
                key={person.id}
                className={`cursor-pointer hover:bg-muted/50 ${index % 2 === 0 ? "bg-muted/20" : ""}`}
                onClick={() => onRowClick(person.id.toString())}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalhes de ${person.nome}, ${person.idade} anos, ${person.sexo === "MASCULINO" ? "masculino" : "feminino"}, ${statusText} em ${statusDate}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onRowClick(person.id.toString())
                  }
                }}
              >
                <TableCell>
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={person.urlFoto} alt={`Foto de ${person.nome}`} />
                    <AvatarFallback aria-label={person.nome || "Pessoa desaparecida"}>
                      {person.nome?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{person.nome}</TableCell>
                <TableCell>{person.idade} anos</TableCell>
                <TableCell>{person.sexo === "MASCULINO" ? "Masculino" : "Feminino"}</TableCell>
                <TableCell> 
                  {formatDate(
                    isDesaparecido
                      ? person.ultimaOcorrencia.dtDesaparecimento || ""
                      : person.ultimaOcorrencia.dataLocalizacao || "",
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                  {person.ultimaOcorrencia.localDesaparecimentoConcat || "-"}
                </TableCell>
                <TableCell>
                  <Badge className={isDesaparecido ? "bg-destructive" : "bg-mt-green"} aria-label={statusText}>
                    {statusText}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

