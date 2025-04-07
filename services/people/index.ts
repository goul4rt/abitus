import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { PessoaDesaparecida, PessoasResponse, PessoasParams } from "./types"
import { fetchMissingPersons, fetchPersonDetails, fetchRandomMissingPersons } from "./service"

export function useMissingPersons(params: PessoasParams, options?: UseQueryOptions<PessoasResponse>) {
  return useQuery({
    queryKey: ["missing-persons", params],
    queryFn: () => fetchMissingPersons(params),
    ...options,
  })
}

export function usePersonDetails(id: string | number | null, options?: UseQueryOptions<PessoaDesaparecida>) {
  return useQuery({
    queryKey: ["person-details", id],
    queryFn: () => fetchPersonDetails(id!),
    enabled: !!id,
    ...options,
  })
}

export function useRandomMissingPersons(count = 4, options?: UseQueryOptions<PessoaDesaparecida[]>) {
  return useQuery({
    queryKey: ["random-missing-persons", count],
    queryFn: () => fetchRandomMissingPersons(count),
    ...options,
  })
}

