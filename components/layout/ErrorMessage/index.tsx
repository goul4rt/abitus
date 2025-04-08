"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ErrorMessageProps } from "./types"

export default function ErrorMessage({
  title = "Ocorreu um erro",
  message = "Não foi possível carregar os dados. Por favor, tente novamente.",
  onRetry,
  fullPage = false,
}: ErrorMessageProps) {
  const content = (
    <div className="flex flex-col items-center justify-center text-center py-6">
      <div className="rounded-full bg-red-100 p-3 mb-4" aria-hidden="true">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Tentar novamente
        </Button>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center" role="alert">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">{content}</CardContent>
        </Card>
      </div>
    )
  }

  return <div role="alert">{content}</div>
}

