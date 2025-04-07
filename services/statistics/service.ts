import API from "@/lib/api"
import type { StatsResponse } from "./types"

export async function getStats(): Promise<StatsResponse> {
  try {
    const response = await API.get("/pessoas/aberto/estatistico")
    return response.data
  } catch (error) {
    console.error("Error fetching stats:", error)
    throw error
  }
} 