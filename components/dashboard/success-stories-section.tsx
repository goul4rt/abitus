"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SuccessStoriesSectionProps {
  loading?: boolean
}

export function SuccessStoriesSection({ loading = false }: SuccessStoriesSectionProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Casos de Sucesso</CardTitle>
        <CardDescription>Pessoas localizadas recentemente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <SuccessStoryCard
                title="Maria Silva, 15 anos"
                description="Desaparecida por 27 dias em Cuiabá. Localizada em bom estado de saúde após campanha nas redes sociais."
              />
              <SuccessStoryCard
                title="João Pereira, 32 anos"
                description="Desaparecido por 8 dias em Várzea Grande. Localizado pela polícia em município vizinho."
              />
              <SuccessStoryCard
                title="Ana Costa, 22 anos"
                description="Desaparecida por 14 dias em Rondonópolis. Localizada após denúncia anônima pelo sistema."
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SuccessStoryCard({ title, description }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground">Imagem de sucesso</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

