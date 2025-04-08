import { ReactNode } from "react"

export interface FormData {
  informacao: string
  descricao: string
  data: string
}

export interface FormErrors {
  informacao?: string
  descricao?: string
  data?: string
  files?: string
}

export interface ReportFormProps {
  onSubmit: (data: FormData, files: File[]) => void
  isSubmitting: boolean
  submitSuccess?: boolean
  submitError?: boolean
  resetSubmitStatus?: () => void
  successContent?: ReactNode
  errorContent?: ReactNode
  id: string | number
} 