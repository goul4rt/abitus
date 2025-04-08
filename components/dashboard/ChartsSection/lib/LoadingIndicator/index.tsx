import { Loader2 } from "lucide-react"
import { LoadingIndicatorProps } from "./types"

export function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  if (!isLoading) return null
  
  return (
    <div className="flex justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
} 