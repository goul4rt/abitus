import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ErrorDisplayProps } from "./types"

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error instanceof Error ? error.message : "Erro ao carregar dados estatísticos"}
      </AlertDescription>
    </Alert>
  )
} 