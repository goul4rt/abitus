"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { FileUploadProps } from "./types"

export default function FileUpload({ files, onFileChange }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="files">Anexar fotos (opcional)</Label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="files"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
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
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <Upload className="w-8 h-8 mb-2 text-muted-foreground" aria-hidden="true" />
            <p className="mb-1 text-sm text-muted-foreground text-center">
              <span className="font-semibold">Toque para selecionar</span> fotos
            </p>
            <p className="text-xs text-muted-foreground text-center">PNG, JPG ou JPEG (máx. 10MB)</p>
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
          <p className="text-sm font-medium mb-2">
            {files.length} {files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}
          </p>
          <ul className="text-sm text-muted-foreground">
            {files.map((file, index) => (
              <li key={index} className="truncate">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 