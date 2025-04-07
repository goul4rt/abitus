import { type UseMutationOptions } from "@tanstack/react-query"

export interface InformacaoFormData {
  informacao: string
  descricao: string
  data: string
}

export interface SubmitPersonInformationParams {
  ocoId: string | number
  formData: InformacaoFormData
  files: File[]
}

export type SubmitPersonInformationOptions = UseMutationOptions<
  any,
  Error,
  SubmitPersonInformationParams
> 