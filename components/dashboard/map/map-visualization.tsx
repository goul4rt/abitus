"use client"
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import("@/components/dashboard/map/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border">
      <div className="text-center p-6">
        <h3 className="text-lg font-medium mb-2">Carregando Mapa</h3>
        <p className="text-muted-foreground">O mapa está sendo carregado...</p>
      </div>
    </div>
  ),
})

export default function MapVisualization() {
  return <MapWithNoSSR />
}

