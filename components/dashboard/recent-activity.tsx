"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

export default function RecentActivityList({ persons }) {
  const router = useRouter()

  if (!persons || persons.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Nenhum caso recente disponível</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {persons.map((person) => (
        <div
          key={person.id}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted cursor-pointer "
          onClick={() => router.push(`/person/${person.id}`)}
        >
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={person.urlFoto} alt={person.nome} />
            <AvatarFallback>{person.nome?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{person.nome}</p>
            <p className="text-sm text-muted-foreground">
              Desaparecido em {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
              {person.ultimaOcorrencia?.localDesaparecimentoConcat &&
                ` • ${person.ultimaOcorrencia.localDesaparecimentoConcat}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

