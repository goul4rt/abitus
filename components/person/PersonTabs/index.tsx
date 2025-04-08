import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Info, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { PersonTabsProps } from "./types";

export function PersonTabs({ ultimaOcorrencia, disapearDate, isLocalized }: PersonTabsProps) {
  return (
    <Tabs defaultValue="info" className="mb-6">
      <TabsList className="w-full">
        <TabsTrigger value="info" className="flex-1">
          Informações
        </TabsTrigger>
        {ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao && (
          <TabsTrigger value="details" className="flex-1">
            Detalhes Adicionais
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="info" className="mt-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Data do desaparecimento</p>
                <p className="text-muted-foreground">
                  {formatDate(ultimaOcorrencia.dtDesaparecimento)}
                </p>
              </div>
            </div>

            {ultimaOcorrencia.localDesaparecimentoConcat && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Local do desaparecimento</p>
                  <p className="text-muted-foreground">
                    {ultimaOcorrencia.localDesaparecimentoConcat}
                  </p>
                </div>
              </div>
            )}

            {ultimaOcorrencia.ocorrenciaEntrevDesapDTO
              ?.vestimentasDesaparecido && (
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Vestimentas quando desapareceu
                  </p>
                  <p className="text-muted-foreground">
                    {
                      ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                        .vestimentasDesaparecido
                    }
                  </p>
                </div>
              </div>
            )}

            {!isLocalized && (
              <div className="flex items-start gap-3">
                <UserCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Data do desaparecimento</p>
                  <p className="text-muted-foreground">{disapearDate}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao && (
        <TabsContent value="details" className="mt-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Informações adicionais</p>
                  <p className="text-muted-foreground">
                    {ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
} 