"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"
import { useInfiniteMissingPersons } from "@/services/people/service"
import { PessoaDesaparecida } from "@/services/people/types"
import { HeatmapPoint, LocationGroup } from "./types"
import { cityCoordinates, mapOptions } from "./constants"
import { Button } from "@/components/ui/button"

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
)
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
)

export default function MapComponent() {
  const [mounted, setMounted] = useState(false)
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([])
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteMissingPersons(
    { porPagina: 100 }, // Parâmetros iniciais
    { enabled: mounted } // Habilita a query apenas após o componente estar montado
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (data?.pages) {
      const allPeople = data.pages.flatMap(page => page.content)
      const processedData = processLocationData(allPeople)
      setHeatmapData(processedData)
    }
  }, [data])

  const processLocationData = (pessoas: PessoaDesaparecida[]): HeatmapPoint[] => {
    const locationGroups: LocationGroup = {}  
    let allUnicLocations = new Set<string>()
    pessoas.forEach(pessoa => {
      if (pessoa.ultimaOcorrencia?.localDesaparecimentoConcat) {
        const location = extractCityFromLocation(pessoa.ultimaOcorrencia.localDesaparecimentoConcat)
        if (!location) {
          allUnicLocations.add(pessoa.ultimaOcorrencia.localDesaparecimentoConcat)
        }
        if (location && cityCoordinates[location]) {
          if (!locationGroups[location]) {
            locationGroups[location] = {
              lat: cityCoordinates[location][0],
              lng: cityCoordinates[location][1],
              count: 0,
              ids: []
            }
          }
          
          locationGroups[location].count += 1
          if (pessoa.id) locationGroups[location].ids.push(pessoa.id)
        }
      }
    })
    // remove duplicates
    const uniqueLocations = Array.from(allUnicLocations)
    const filteredLocations = uniqueLocations.filter(location => cityCoordinates[location])
    const filteredLocationGroups = filteredLocations.reduce((acc, location) => {
      if (locationGroups[location]) {
        acc[location] = locationGroups[location]
      }
      return acc
    }, {} as LocationGroup)
    console.log(`allUnicLocations`, allUnicLocations)

    return Object.entries(locationGroups).map(([name, data]) => ({
      lat: data.lat,
      lng: data.lng,
      weight: calculateWeight(data.count),
      name,
      count: data.count,
      ids: data.ids
    }))
  }

  const extractCityFromLocation = (location: string): string | null => {
    for (const city in cityCoordinates) {
      if (location.includes(city)) {
        return city
      }
    }
    
    return null
  }

  const calculateWeight = (count: number): number => {
    if (count >= 50) return 35
    if (count >= 30) return 25
    if (count >= 20) return 18
    if (count >= 10) return 12
    if (count >= 5) return 8
    return 4
  }

  const getMarkerColor = (weight: number): string => {
    if (weight > 25) return "#ef4444"
    if (weight > 15) return "#f97316"
    if (weight > 8) return "#eab308"
    return "#22c55e"
  }

  const getMarkerRadius = (weight: number): number => {
    return Math.max(10, Math.min(30, weight * 0.8))
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (!mounted) {
    return (
      <div
        className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border"
        aria-label="Carregando mapa"
        role="status"
      >
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">Carregando Mapa</h3>
          <p className="text-muted-foreground">O mapa está sendo inicializado...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border"
        aria-label="Erro ao carregar mapa"
        role="alert"
      >
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2 text-destructive">Erro</h3>
          <p className="text-muted-foreground">{error instanceof Error ? error.message : "Erro ao carregar dados do mapa"}</p>
        </div>
      </div>
    )
  }

  if (heatmapData.length === 0 && !isFetching) {
    return (
      <div
        className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border"
        aria-label="Sem dados no mapa"
        role="status"
      >
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">Sem dados disponíveis</h3>
          <p className="text-muted-foreground">Não há dados de localização para exibir no mapa</p>
        </div>
      </div>
    )
  }

  const totalLoaded = data?.pages.reduce((total, page) => total + page.content.length, 0) || 0
  const totalAvailable = data?.pages[0]?.totalElements || 0

  return (
    <div aria-label="Mapa de distribuição de casos" role="region" className="h-full flex flex-col">
      <div className="flex-1 relative">
        {mounted && (
          <MapContainer
            style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
            className="z-0"
            center={mapOptions.center}
            zoom={mapOptions.zoom}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {heatmapData.map((point, index) => (
              <CircleMarker
                key={index}
                center={[point.lat, point.lng]}
                pathOptions={{
                  fillColor: getMarkerColor(point.weight),
                  fillOpacity: 0.7,
                  weight: 1,
                  color: getMarkerColor(point.weight),
                  opacity: 0.8
                }}
                radius={getMarkerRadius(point.weight)}
              >
                <Tooltip>
                  <div>
                    <strong>{point.name}</strong>
                    <div>{point.count} pessoa(s) desaparecida(s)</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        )}
        
        {/* Overlay de carregamento */}
        {isFetching && !isFetchingNextPage && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-md">
            <div className="bg-white p-4 rounded-md shadow-lg">
              <p className="text-center">Carregando dados...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Informações e botão de carregar mais */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium">{totalLoaded}</span> de <span className="font-medium">{totalAvailable}</span> registros
          {data?.pages && data.pages.length > 1 && (
            <span className="ml-1">({data.pages.length} páginas carregadas)</span>
          )}
        </div>
        
        {hasNextPage && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Carregando..." : "Carregar mais dados"}
          </Button>
        )}
      </div>
    </div>
  )
} 