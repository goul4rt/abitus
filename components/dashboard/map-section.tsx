"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MapVisualization from "@/components/map-visualization"

export function MapSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição Geográfica</CardTitle>
        <CardDescription>Mapa de calor de ocorrências por região</CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <div className="h-[500px] w-full">
          <MapVisualization />
        </div>
      </CardContent>
    </Card>
  )
}

