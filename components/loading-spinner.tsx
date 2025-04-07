import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: number
  text?: string
  fullPage?: boolean
}

export default function LoadingSpinner({ size = 24, text = "Carregando...", fullPage = false }: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
      <Loader2 className="animate-spin" size={size} aria-hidden="true" />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
      <span className="sr-only">Carregando</span>
    </div>
  )

  if (fullPage) {
    return <div className="h-[50vh] w-full flex items-center justify-center">{spinner}</div>
  }

  return spinner
}

