import { PessoaDesaparecida } from "@/services/people/types"
import { cityCoordinates } from "./constants"
import { HeatmapPoint, LocationGroup } from "./types"

export const extractCityFromLocation = (location: string): string | null => {
  for (const city in cityCoordinates) {
    if (location.includes(city)) {
      return city
    }
  }
  
  return null
}

export const calculateWeight = (count: number): number => {
  if (count >= 100) return 45
  if (count >= 80) return 40
  if (count >= 60) return 35
  if (count >= 50) return 30
  if (count >= 40) return 27
  if (count >= 30) return 24
  if (count >= 25) return 21
  if (count >= 20) return 18
  if (count >= 15) return 15
  if (count >= 10) return 12
  if (count >= 7) return 10
  if (count >= 5) return 8
  if (count >= 3) return 6
  if (count >= 2) return 5
  return 4
}

export const getMarkerColor = (weight: number): string => {
  if (weight >= 35) return "#b91c1c" 
  if (weight >= 30) return "#dc2626"
  if (weight >= 25) return "#ef4444" 
  if (weight >= 20) return "#ea580c"
  if (weight >= 15) return "#f97316"
  if (weight >= 12) return "#f59e0b"
  if (weight >= 10) return "#eab308"
  if (weight >= 8) return "#84cc16"
  if (weight >= 6) return "#22c55e"
  return "#4ade80"
}

export const getMarkerRadius = (weight: number): number => {
  return Math.max(10, Math.min(30, weight * 0.8))
}

export const processLocationData = (pessoas: PessoaDesaparecida[]): HeatmapPoint[] => {
  const locationGroups: LocationGroup = {}  
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

  return Object.entries(locationGroups).map(([name, data]) => ({
    lat: data.lat,
    lng: data.lng,
    weight: calculateWeight(data.count),
    name,
    count: data.count,
    ids: data.ids
  }))
} 