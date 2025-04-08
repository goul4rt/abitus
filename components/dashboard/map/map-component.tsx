"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"
import { fetchMissingPersons } from "@/services/people/service"
import { PessoaDesaparecida } from "@/services/people/types"
import type { CircleMarkerProps } from "react-leaflet"

// Interface para os dados do mapa
interface HeatmapPoint {
  lat: number
  lng: number
  weight: number
  name: string
  count: number
  ids: number[]
}

// Interface para os dados de localização agrupados
interface LocationGroup {
  [key: string]: {
    lat: number
    lng: number
    count: number
    ids: number[]
  }
}

// Importando dinamicamente para evitar erros de SSR
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
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

export default function MapComponent() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Coordenadas aproximadas de cidades em Mato Grosso
  const cityCoordinates: { [key: string]: [number, number] } = {
    "Cuiabá": [-15.5989, -56.0949],
    "Várzea Grande": [-15.6527, -56.1203],
    "Rondonópolis": [-16.4598, -54.6349],
    "Sinop": [-11.8607, -55.5055],
    "Tangará da Serra": [-14.4212, -57.3501],
    "Cáceres": [-16.0669, -57.6793],
    "Alta Floresta": [-10.6743, -55.7241],
    "Juína": [-10.1686, -59.4478],
    "Barra do Garças": [-16.0876, -50.1384],
    "Pontes e Lacerda": [-15.0292, -59.9527],
  }

  useEffect(() => {
    setMounted(true)

    async function fetchData() {
      try {
        setLoading(true)
        // Buscar dados da API com limite maior para ter dados suficientes
        const response = await fetchMissingPersons({ pagina: 0, porPagina: 100 })
        
        if (response && response.content) {
          // Processar os dados para criar o heatmap
          const processedData = processLocationData(response.content)
          setHeatmapData(processedData)
        } else {
          setError("Não foi possível obter dados de pessoas desaparecidas")
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err)
        setError("Erro ao carregar dados do mapa")
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      fetchData()
    }
  }, [mounted])

  // Função para processar dados de localização
  const processLocationData = (pessoas: PessoaDesaparecida[]): HeatmapPoint[] => {
    const locationGroups: LocationGroup = {}

    // Agrupar pessoas por localização
    pessoas.forEach(pessoa => {
      if (pessoa.ultimaOcorrencia?.localDesaparecimentoConcat) {
        const location = extractCityFromLocation(pessoa.ultimaOcorrencia.localDesaparecimentoConcat)
        
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

    // Converter grupos para pontos do heatmap
    return Object.entries(locationGroups).map(([name, data]) => ({
      lat: data.lat,
      lng: data.lng,
      weight: calculateWeight(data.count),
      name,
      count: data.count,
      ids: data.ids
    }))
  }

  // Extrai o nome da cidade da string de localização
  const extractCityFromLocation = (location: string): string | null => {
    // Tenta encontrar uma cidade conhecida na string de localização
    for (const city in cityCoordinates) {
      if (location.includes(city)) {
        return city
      }
    }
    
    // Se não encontrar uma cidade conhecida, retorna null
    return null
  }

  // Calcular o peso com base na contagem
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

  if (!mounted || loading) {
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

  if (error) {
    return (
      <div
        className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border"
        aria-label="Erro ao carregar mapa"
        role="alert"
      >
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2 text-destructive">Erro</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // Se não houver dados, mostrar mensagem informativa
  if (heatmapData.length === 0) {
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

  const isDarkMode = theme === "dark"

  // Configuração do mapa
  const mapOptions: MapOptions = {
    center: cityCoordinates["Cuiabá"],
    zoom: 6
  }

  return (
    <div aria-label="Mapa de distribuição de casos" role="region" className="h-full">
      {mounted && (
        <MapContainer
          style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
          className="z-0"
          {...mapOptions}
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
                opacity: 0.8,
                radius: getMarkerRadius(point.weight)
              }}
            >
              <Tooltip>
                {point.name}
              </Tooltip>
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium">{point.name}</h3>
                  <p className="text-sm">{point.count} casos registrados</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

