import { API_BASE_URL } from "@/lib/api"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import type { SubmitPersonInformationOptions, SubmitPersonInformationParams } from "./types"

export function useSubmitPersonInformation(
  options?: SubmitPersonInformationOptions,
) {
  return useMutation({
    mutationFn: async ({ ocoId, formData, files }: SubmitPersonInformationParams) => {
      const form = new FormData()

      form.append("ocoId", ocoId.toString())
      form.append("informacao", formData.informacao)
      form.append("descricao", formData.descricao)
      form.append("data", formData.data)

      if (files && files.length > 0) {
        files.forEach((file) => {
          form.append("files", file)
        })
      }

      const response = await axios.post(`${API_BASE_URL}/ocorrencias/informacoes-desaparecido`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    },
    ...options,
  })
}

