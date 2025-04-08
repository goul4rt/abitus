"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import { HeatmapPoint } from "../../types"
import { getMarkerColor, getMarkerRadius } from "../../utils"

const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
)

const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
)

interface MapMarkersProps {
  points: HeatmapPoint[]
}

export function MapMarkers({ points }: MapMarkersProps) {
  const markers = useMemo(() => {
    return points.map((point, index) => (
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
    ))
  }, [points])

  return <>{markers}</>
} 