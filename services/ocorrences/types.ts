import { type UseMutationOptions } from "@tanstack/react-query"

export interface InformacaoFormDesaparecimento{
  informacao: string
  descricao: string
  data: string
}

export interface SubmitPersonInformationParams {
  ocoId: string | number
  formData: InformacaoFormDesaparecimento
  files: File[]
}

export type SubmitPersonInformationOptions = UseMutationOptions<
  any,
  Error,
  SubmitPersonInformationParams
> 