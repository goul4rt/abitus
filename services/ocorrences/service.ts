import API from "@/lib/api"
import axios from "axios"
import type { SubmitPersonInformationParams } from "./types"

export async function submitPersonInformation({ ocoId, formData, files }: SubmitPersonInformationParams) {
  try {
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

    const response = await API.post("/ocorrencias/informacoes-desaparecido", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Erro ao enviar informações: ${error.response?.data?.message || error.message}`
      )
    }
    throw new Error("Erro desconhecido ao enviar informações")
  }
} 