import { AxiosError } from "axios"
import { toast } from "@/components/ui/use-toast"
import { ApiError } from "./types"

export function formatApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500
    const errorData = error.response?.data as any

    return {
      status,
      message: errorData?.message || error.message || "Erro desconhecido",
      details: errorData?.details || error.cause?.toString(),
      timestamp: new Date().toISOString(),
    }
  }

  return {
    status: 500,
    message: error instanceof Error ? error.message : "Erro desconhecido",
    timestamp: new Date().toISOString(),
  }
}

export function logApiError(error: unknown, context: string): void {
  const formattedError = formatApiError(error)

  console.error(`API Error [${context}]:`, {
    ...formattedError,
    originalError: error,
  })
}

export function notifyApiError(error: unknown, title: string, fallbackMessage: string): void {
  const formattedError = formatApiError(error)

  toast({
    title,
    description: formattedError.status < 500 ? formattedError.message : fallbackMessage,
    variant: "destructive",
  })
}

export function handleApiError<T>(
  error: unknown,
  context: string,
  options?: {
    notify?: boolean
    title?: string
    message?: string
    defaultValue?: T
  },
): T {
  logApiError(error, context)

  if (options?.notify) {
    notifyApiError(error, options.title || "Erro", options.message || "Ocorreu um erro inesperado")
  }

  if ("defaultValue" in (options || {})) {
    return (options || {}).defaultValue as T
  }

  throw error
} 