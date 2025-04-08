"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Info,
  UserCheck,
  Share2,
} from "lucide-react";
import { usePersonDetails } from "@/services/people";
import { formatDate, getPersonStatus } from "@/lib/utils";
import Image from "next/image";
import generateJsonLd from "@/app/json-ld";
import ErrorMessage from "@/components/layout/error-message";
import { useMemo } from "react";
import { PessoaDesaparecida } from "@/services/people/types";

export default function PersonDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = useMemo(() => params?.id as string, [params]);

  const { data: person, isLoading, error, refetch } = usePersonDetails(id);

  const { nome, idade, sexo, vivo, urlFoto, ultimaOcorrencia } = useMemo(() => {
    return {
      nome: person?.nome || "",
      idade: person?.idade || 0,
      sexo: person?.sexo || "",
      vivo: person?.vivo || false,
      urlFoto: person?.urlFoto || "",
      ultimaOcorrencia: person?.ultimaOcorrencia || {},
    } as PessoaDesaparecida;
  }, [person]);

  const { isLocalized, statusText, statusDate } = useMemo(() => {
    return getPersonStatus(person);
  }, [person]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Pessoa Desaparecida: ${person?.nome}`,
        text: `Ajude a encontrar ${person?.nome}, ${
          person?.idade
        } anos, desaparecido(a) desde ${statusDate}.`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full max-w-md mx-auto" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <ErrorMessage
          title="Erro ao carregar dados"
          message={error?.message || "Pessoa não encontrada"}
          onRetry={() => refetch()}
          fullPage
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd("person", person)),
        }}
      />

      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border">
            {urlFoto ? (
              <Image
                src={urlFoto || "/placeholder.svg"}
                alt={nome}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">
                  Sem foto disponível
                </span>
              </div>
            )}
          </div>

          {ultimaOcorrencia.listaCartaz &&
            ultimaOcorrencia.listaCartaz.length > 0 && (
              <div className="mt-4 w-full max-w-md">
                <h3 className="font-medium mb-2">Cartazes disponíveis:</h3>
                <div className="flex flex-wrap gap-2">
                  {ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                    <a
                      key={index}
                      href={cartaz.urlCartaz}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border px-3 py-1 text-sm hover:bg-accent"
                    >
                      {cartaz.tipoCartaz === "PDF_DESAPARECIDO"
                        ? "Cartaz PDF"
                        : cartaz.tipoCartaz}
                    </a>
                  ))}
                </div>
              </div>
            )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{nome}</h1>
            <Badge className={!isLocalized ? "bg-destructive" : "bg-green-600"}>
              {!isLocalized ? "Desaparecido" : "Localizado"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <div>
              <span className="font-medium">Idade:</span> {idade} anos
            </div>
            <div>
              <span className="font-medium">Sexo:</span>{" "}
              {sexo === "MASCULINO" ? "Masculino" : "Feminino"}
            </div>
            {!isLocalized && (
              <div className="col-span-2">
                <span className="font-medium">Status:</span>{" "}
                {vivo ? "Encontrado com vida" : "Encontrado sem vida"}
              </div>
            )}
          </div>

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
                        <p className="text-muted-foreground">
                          {statusDate}
                        </p>
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

          {!isLocalized && (
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push(`/person/${id}/report`)}
            >
              Informar sobre esta pessoa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
