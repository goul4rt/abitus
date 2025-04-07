import api from "@/lib/api"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { StatsResponse } from "./types"

export function useStats(options?: UseQueryOptions<StatsResponse>) {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/pessoas/aberto/estatistico")
      return response.data
    },
    ...options,
  })
}

