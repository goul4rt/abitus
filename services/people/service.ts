import API from "@/lib/api"
import axios from "axios"
import type { PessoaDesaparecida, PessoasResponse, PessoasParams } from "./types"
import { useInfiniteQuery } from "@tanstack/react-query"

export async function fetchMissingPersons(params: PessoasParams): Promise<PessoasResponse> {
  try {
    const response = await API.get("/pessoas/aberto/filtro", { params })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: params.porPagina || 10,
        number: params.pagina || 0,
      }
    }
    throw error
  }
}

export async function fetchPersonDetails(id: string | number): Promise<PessoaDesaparecida> {
  if (!id) throw new Error("ID é obrigatório")
  const response = await API.get(`/pessoas/${id}`)
  return response.data
}

export async function fetchRandomMissingPersons(count: number): Promise<PessoaDesaparecida[]> {
  const response = await API.get("/pessoas/aberto/dinamico", {
    params: { registros: count },
  })
  return response.data
}

export function useInfiniteMissingPersons(
  initialParams: Omit<PessoasParams, "pagina">,
  options = {}
) {
  return useInfiniteQuery({
    queryKey: ["missingPersons", initialParams],
    queryFn: async ({ pageParam = 0 }) => {
      const params: PessoasParams = {
        ...initialParams,
        pagina: pageParam,
      }
      return await fetchMissingPersons(params)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 1
      }
      return undefined
    },
    ...options,
  })
} 