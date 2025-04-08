"use client"

import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SuccessMessageProps, ErrorMessageProps } from "./types"

export function SuccessMessage({ customContent }: SuccessMessageProps) {
  return (
    customContent || (
      <div
        className="flex flex-col items-center justify-center py-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-full bg-green-100 p-3 mb-4" aria-hidden="true">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Informação enviada com sucesso!</h3>
        <p className="text-muted-foreground">
          Obrigado por contribuir. Sua informação será analisada pelas autoridades.
        </p>
      </div>
    )
  )
}

export function ErrorMessage({ customContent, onRetry }: ErrorMessageProps) {
  return (
    customContent || (
      <div className="flex flex-col items-center justify-center py-8 text-center" role="alert">
        <div className="rounded-full bg-red-100 p-3 mb-4" aria-hidden="true">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Erro ao enviar informação</h3>
        <p className="text-muted-foreground mb-4">
          Ocorreu um erro ao enviar sua informação. Por favor, tente novamente.
        </p>
        {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
      </div>
    )
  )
}

export default {
  SuccessMessage,
  ErrorMessage
} 