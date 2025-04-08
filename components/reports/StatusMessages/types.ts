import { ReactNode } from "react"

export interface SuccessMessageProps {
  customContent?: ReactNode
}

export interface ErrorMessageProps {
  customContent?: ReactNode
  onRetry?: () => void
} 