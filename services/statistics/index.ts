import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { StatsResponse } from "./types"
import { getStats } from "./service"

export function useStats(options?: UseQueryOptions<StatsResponse>) {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    ...options,
  })
}



export function useStatsCards(options?: UseQueryOptions<StatsResponse>) {
  return useQuery({
    queryKey: ["stats_cards"],
    queryFn: getStats,
    ...options,
  })
}

