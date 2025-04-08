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