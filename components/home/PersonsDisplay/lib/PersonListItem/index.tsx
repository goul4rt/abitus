"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, getPersonStatus } from "@/lib/utils";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PersonListItemProps } from "./type";
import { useMemo } from "react";
import Link from "next/link";

export default function PersonListItem({ person }: PersonListItemProps) {
  const { nome, idade, sexo, urlFoto, ultimaOcorrencia } = person;
  const { isLocalized, statusText, statusDate, disapearDate } = useMemo(() => {
    return getPersonStatus(person);
  }, [person]);

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Link href={`/person/${person.id}`}>
        <Card
          className="overflow-hidden transition-all hover:shadow-md cursor-pointer border-l-4 relative"
          style={{
            borderLeftColor: !isLocalized
              ? "var(--destructive)"
              : "var(--green-600)",
          }}
          tabIndex={0}
          role="button"
          aria-label={`Ver detalhes de ${nome}, ${idade} anos, ${
            sexo === "MASCULINO" ? "masculino" : "feminino"
          }, ${statusText} em ${statusDate}`}
        >
          <Badge
            className={`text-xs whitespace-nowrap absolute bottom-0.5 right-0.5 ${
              !isLocalized ? "bg-destructive" : "bg-green-600"
            } md:hidden`}
            aria-label={statusText}
          >
            {statusText}
          </Badge>

          <CardContent className="p-3 md:p-4">
            <div className="grid grid-cols-[auto_1fr_auto] md:flex md:flex-row items-start md:items-center gap-2 md:gap-4">
              <Avatar className="h-12 w-12 md:h-16 md:w-16 border row-span-3 md:row-span-1">
                <AvatarImage src={urlFoto} alt={`Foto de ${nome}`} />
                <AvatarFallback aria-label={nome || "Pessoa desaparecida"}>
                  {nome?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 col-span-2 md:col-span-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                  <h3 className="font-semibold text-base md:text-lg max-w-[150px] md:max-w-none truncate">
                    {nome}
                  </h3>
                  <Badge
                    className={cn(
                      "text-xs whitespace-nowrap hidden md:block",
                      !isLocalized ? "bg-destructive" : "bg-green-600"
                    )}
                    aria-label={statusText}
                  >
                    {statusText}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xs md:text-sm text-muted-foreground mb-1">
                  <span className="whitespace-nowrap">{idade} anos</span>
                  <span aria-hidden="true" className="hidden md:inline">
                    •
                  </span>
                  <span className="whitespace-nowrap">
                    {sexo === "MASCULINO" ? "Masculino" : "Feminino"}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap gap-y-1 gap-x-0 md:gap-x-4 text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar
                      className="h-3 w-3 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">
                      Desapareceu em {disapearDate}
                    </span>
                  </div>

                  {ultimaOcorrencia.localDesaparecimentoConcat && (
                    <div className="flex items-center gap-1">
                      <MapPin
                        className="h-3 w-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate max-w-[180px] md:max-w-none">
                        {ultimaOcorrencia.localDesaparecimentoConcat}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8 md:h-10 md:w-10 p-1 md:p-2 self-center row-span-1 col-start-3"
                aria-label={`Ver detalhes de ${nome}`}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Ver detalhes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
