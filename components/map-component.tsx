"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapComponent() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heatmapData = [
    { lat: -15.5989, lng: -56.0949, weight: 35, name: "Cuiabá", count: 145 },
    { lat: -16.0669, lng: -57.6793, weight: 12, name: "Cáceres", count: 47 },
    { lat: -15.6527, lng: -56.1203, weight: 28, name: "Várzea Grande", count: 93 },
    { lat: -16.4598, lng: -54.6349, weight: 18, name: "Rondonópolis", count: 65 },
    { lat: -11.8607, lng: -55.5055, weight: 15, name: "Sinop", count: 58 },
    { lat: -14.4212, lng: -57.3501, weight: 8, name: "Tangará da Serra", count: 32 },
    { lat: -10.6743, lng: -55.7241, weight: 6, name: "Alta Floresta", count: 24 },
    { lat: -10.1686, lng: -59.4478, weight: 4, name: "Juína", count: 18 },
    { lat: -16.0876, lng: -50.1384, weight: 4, name: "Barra do Garças", count: 21 },
    { lat: -15.0292, lng: -59.9527, weight: 5, name: "Pontes e Lacerda", count: 19 },
  ]

  const getMarkerColor = (weight) => {
    if (weight > 25) return "#ef4444"
    if (weight > 15) return "#f97316"
    if (weight > 8) return "#eab308"
    return "#22c55e"
  }

  const getMarkerRadius = (weight) => {
    return Math.max(10, Math.min(30, weight * 0.8))
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

  const isDarkMode = theme === "dark"

  return (
    <div aria-label="Mapa de distribuição de casos" role="region">
      <MapContainer
        center={[-15.5989, -56.0949]}
        zoom={6}
        style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
        className="z-0"
        aria-label="Mapa de calor de ocorrências por região"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={isDarkMode ? "dark-map-tiles" : ""}
        />
        {heatmapData.map((point, index) => (
          <CircleMarker
            key={index}
            center={[point.lat, point.lng]}
            radius={getMarkerRadius(point.weight)}
            pathOptions={{
              fillColor: getMarkerColor(point.weight),
              fillOpacity: 0.7,
              weight: 1,
              color: getMarkerColor(point.weight),
              opacity: 0.8,
            }}
            eventHandlers={{
              keypress: (e) => {
                if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
                  e.target.openPopup()
                }
              },
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -10]}>
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
    </div>
  )
}

