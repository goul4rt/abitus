"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPersonStatus } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PersonCardProps } from "./type";
import { useMemo } from "react";
import Link from "next/link";

export default function PersonCard({ person }: PersonCardProps) {
  const { nome, idade, sexo, urlFoto, ultimaOcorrencia } = person;
  const { isLocalized, statusText, statusDate, disapearDate } = useMemo(() => {
    return getPersonStatus(person);
  }, [person]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link href={`/person/${person.id}`}>
        <Card
          className="overflow-hidden transition-all hover:shadow-md cursor-pointer border-t-4 border-t-slate-200 h-full flex flex-col"
          tabIndex={0}
          role="button"
          aria-label={`Ver detalhes de ${nome}, ${idade} anos, ${
            sexo === "MASCULINO" ? "masculino" : "feminino"
          }, ${statusText} em ${statusDate}`}
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
              <div
                className="flex h-full w-full items-center justify-center bg-muted"
                aria-label="Sem foto disponível"
              >
                <span className="text-muted-foreground">
                  Sem foto disponível
                </span>
              </div>
            )}
            <Badge
              className={`absolute top-2 right-2 ${
                !isLocalized ? "bg-destructive" : "bg-green-600"
              }`}
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
              <span>Desapareceu em {disapearDate}</span>
            </div>

            {ultimaOcorrencia.localDesaparecimentoConcat && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                <span className="truncate">
                  {ultimaOcorrencia.localDesaparecimentoConcat}
                </span>
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
