"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PersonCard({ person, onClick }) {
  const { nome, idade, sexo, urlFoto, ultimaOcorrencia } = person
  const isDesaparecido = !ultimaOcorrencia.dataLocalizacao
  const statusText = isDesaparecido ? "Desaparecido" : "Localizado"
  const statusDate = isDesaparecido
    ? formatDate(ultimaOcorrencia.dtDesaparecimento)
    : formatDate(ultimaOcorrencia.dataLocalizacao)
  const location = ultimaOcorrencia.localDesaparecimentoConcat

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="h-full">
      <Card
        className="overflow-hidden transition-all hover:shadow-md cursor-pointer border-t-4 border-t-slate-200 h-full flex flex-col"
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
        <div className="aspect-square relative">
          {urlFoto ? (
            <Image
              src={urlFoto || "/placeholder.svg"}
              alt={`Foto de ${nome}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted" aria-label="Sem foto disponível">
              <span className="text-muted-foreground">Sem foto disponível</span>
            </div>
          )}
          <Badge
            className={`absolute top-2 right-2 ${isDesaparecido ? "bg-destructive" : "bg-green-600"}`}
            aria-label={statusText}
          >
            {statusText}
          </Badge>
        </div>

        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg truncate">{nome}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{idade} anos</span>
            <span aria-hidden="true">•</span>
            <span>{sexo === "MASCULINO" ? "Masculino" : "Feminino"}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2 bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <span>
              {isDesaparecido
                ? `Desaparecido em ${formatDate(ultimaOcorrencia.dtDesaparecimento)}`
                : `Localizado em ${formatDate(ultimaOcorrencia.dataLocalizacao)}`}
            </span>
          </div>

          {ultimaOcorrencia.localDesaparecimentoConcat && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              <span className="truncate">{ultimaOcorrencia.localDesaparecimentoConcat}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

