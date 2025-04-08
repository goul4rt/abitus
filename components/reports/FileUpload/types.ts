import { ChangeEvent } from "react"

export interface FileUploadProps {
  files: File[]
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
} 