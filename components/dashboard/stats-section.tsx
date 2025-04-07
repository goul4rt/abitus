"use client"

import StatsCards from "@/components/stats-cards"
import { useStats } from "@/services/statistics"

export function StatsSection() {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useStats()

  const stats = {
    quantPessoasDesaparecidas: statsData?.quantPessoasDesaparecidas || 0,
    quantPessoasEncontradas: statsData?.quantPessoasEncontradas || 0,
    totalCasos: (statsData?.quantPessoasDesaparecidas || 0) + (statsData?.quantPessoasEncontradas || 0),
    percentualLocalizados: statsData
      ? (
          (statsData.quantPessoasEncontradas /
            (statsData.quantPessoasDesaparecidas + statsData.quantPessoasEncontradas)) *
          100
        ).toFixed(1)
      : 0,
  }

  return <StatsCards stats={stats} loading={statsLoading} />
}

