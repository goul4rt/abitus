"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { FileUploadProps } from "./types"

export default function FileUpload({ files, onFileChange }: FileUploadProps) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="files">Anexar fotos (opcional)</Label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="files"
          className="flex flex-col items-center justify-center w-full h-36 sm:h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              document.getElementById("files")?.click()
            }
          }}
          role="button"
          aria-label="Anexar fotos"
        >
          <div className="flex flex-col items-center justify-center py-3 px-2 sm:py-4 sm:px-4 text-center">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-muted-foreground" aria-hidden="true" />
            <p className="mb-1 text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold">Toque para selecionar</span> fotos
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">PNG, JPG ou JPEG (máx. 10MB)</p>
          </div>
          <Input
            id="files"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={onFileChange}
            aria-label="Anexar fotos"
            capture="environment"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-2" aria-live="polite">
          <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {files.length} {files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}
          </p>
          <ul className="text-xs sm:text-sm text-muted-foreground max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <li key={index} className="truncate mb-1">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 