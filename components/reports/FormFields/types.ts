import { Control } from "react-hook-form"
import { FormData } from "../ReportForm/types"

export interface FormFieldProps {
  name: keyof FormData
  control: Control<FormData>
  label: string
  placeholder: string
  isRequired?: boolean
  hasError?: boolean
  errorMessage?: string
}

export interface TextareaFieldProps extends FormFieldProps {
  rows?: number
}

export interface DateFieldProps extends FormFieldProps {
  maxDate?: string
} 