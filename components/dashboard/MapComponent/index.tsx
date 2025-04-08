"use client"

import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import { useInfiniteMissingPersons } from "@/services/people/service"
import { HeatmapPoint } from "./types"
import { processLocationData } from "./utils"
import { MapView } from "./lib/MapView"
import { MapControls } from "./lib/MapControls"
import { 
  MapLoadingState, 
  MapErrorState, 
  MapEmptyState,
  MapLoadingOverlay
} from "./lib/MapStates"

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
    { porPagina: 100 },
    { enabled: mounted }
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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (!mounted) {
    return <MapLoadingState />
  }

  if (isError) {
    return <MapErrorState error={error} />
  }

  if (heatmapData.length === 0 && !isFetching) {
    return <MapEmptyState />
  }

  const totalLoaded = data?.pages.reduce((total, page) => total + page.content.length, 0) || 0
  const totalAvailable = data?.pages[0]?.totalElements || 0
  const pagesLoaded = data?.pages.length || 0

  return (
    <div aria-label="Mapa de distribuição de casos" role="region" className="h-full flex flex-col">
      <div className="flex-1 relative">
        {mounted && <MapView points={heatmapData} />}
        
        {isFetching && !isFetchingNextPage && <MapLoadingOverlay />}
      </div>
      
      <MapControls 
        totalLoaded={totalLoaded}
        totalAvailable={totalAvailable}
        pagesLoaded={pagesLoaded}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  )
} 