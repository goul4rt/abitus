"use client"

import dynamic from "next/dynamic"
import { HeatmapPoint } from "../../types"
import { mapOptions } from "../../constants"
import { MapMarkers } from "../MapMarkers"

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)

interface MapViewProps {
  points: HeatmapPoint[]
}

export function MapView({ points }: MapViewProps) {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
      className="z-0"
      center={mapOptions.center}
      zoom={mapOptions.zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers points={points} />
    </MapContainer>
  )
} 