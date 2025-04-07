"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PersonListItemProps } from "./type"

export default function PersonListItem({ person, onClick }: PersonListItemProps) {
  const { nome, idade, sexo, urlFoto, ultimaOcorrencia } = person
  const isDesaparecido = !ultimaOcorrencia.dataLocalizacao
  const statusText = isDesaparecido ? "Desaparecido" : "Localizado"
  const statusDate = isDesaparecido
    ? formatDate(ultimaOcorrencia.dtDesaparecimento)
    : formatDate(ultimaOcorrencia.dataLocalizacao || "")
  const location = ultimaOcorrencia.localDesaparecimentoConcat

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card
        className="overflow-hidden transition-all hover:shadow-md cursor-pointer border-l-4"
        style={{
          borderLeftColor: isDesaparecido ? "var(--destructive)" : "var(--green-600)",
        }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`Ver detalhes de ${nome}, ${idade} anos, ${sexo === "MASCULINO" ? "masculino" : "feminino"}, ${statusText} em ${statusDate}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={urlFoto} alt={`Foto de ${nome}`} />
              <AvatarFallback aria-label={nome || "Pessoa desaparecida"}>{nome?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{nome}</h3>
                <Badge className={isDesaparecido ? "bg-destructive" : "bg-green-600"} aria-label={statusText}>
                  {statusText}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>{idade} anos</span>
                <span aria-hidden="true">•</span>
                <span>{sexo === "MASCULINO" ? "Masculino" : "Feminino"}</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>
                    {isDesaparecido
                      ? `Desaparecido em ${formatDate(ultimaOcorrencia.dtDesaparecimento)}`
                      : `Localizado em ${formatDate(ultimaOcorrencia.dataLocalizacao || "")}`}
                  </span>
                </div>

                {ultimaOcorrencia.localDesaparecimentoConcat && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    <span className="truncate">{ultimaOcorrencia.localDesaparecimentoConcat}</span>
                  </div>
                )}
              </div>
            </div>

            <Button variant="ghost" size="icon" className="ml-2 shrink-0" aria-label={`Ver detalhes de ${nome}`}>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Ver detalhes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

