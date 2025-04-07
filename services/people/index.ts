import api from "@/lib/api"
import axios from "axios"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { PessoaDesaparecida, PessoasResponse, PessoasParams } from "./types"

export async function fetchMissingPersons(params: PessoasParams): Promise<PessoasResponse> {
  const response = await api.get("/pessoas/aberto/filtro", { params })
  return response.data
}

export function useMissingPersons(params: PessoasParams, options?: UseQueryOptions<PessoasResponse>) {
  return useQuery({
    queryKey: ["missing-persons", params],
    queryFn: async () => {
      try {
        const response = await fetchMissingPersons(params)
        return response
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
    },
    ...options,
  })
}

export function usePersonDetails(id: string | number | null, options?: UseQueryOptions<PessoaDesaparecida>) {
  return useQuery({
    queryKey: ["person-details", id],
    queryFn: async () => {
      if (!id) throw new Error("ID é obrigatório")
      const response = await api.get(`/pessoas/${id}`)
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}

export function useRandomMissingPersons(count = 4, options?: UseQueryOptions<PessoaDesaparecida[]>) {
  return useQuery({
    queryKey: ["random-missing-persons", count],
    queryFn: async () => {
      const response = await api.get("/pessoas/aberto/dinamico", {
        params: { registros: count },
      })
      return response.data
    },
    ...options,
  })
}

