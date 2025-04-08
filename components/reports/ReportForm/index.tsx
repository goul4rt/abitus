"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/loading-spinner"
import { toast } from "@/hooks/use-toast"
import { FormData, ReportFormProps } from "./types"
import { reportFormSchema } from "../validator"
import { TextareaField, DateField } from "../FormFields"
import FileUpload from "../FileUpload"
import { SuccessMessage, ErrorMessage } from "../StatusMessages"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ReportForm({
  onSubmit, isSubmitting, submitSuccess, submitError,
  resetSubmitStatus, successContent, errorContent, id
}: ReportFormProps) {
  const isMobile = useIsMobile()
  const [files, setFiles] = useState<File[]>([])
  const hasFiles = files.length > 0

  const { control, handleSubmit, formState: { errors }, trigger } = useForm<FormData>({
    resolver: yupResolver(reportFormSchema) as any,
    mode: "onBlur",
    context: { hasFiles }
  })

  useEffect(() => {
    if (submitSuccess) {
      toast({
        title: "Informação enviada",
        description: "Sua informação foi enviada com sucesso. Obrigado pela contribuição.",
        variant: "default",
      })
    }
  }, [submitSuccess])

  useEffect(() => {
    if (submitError) {
      toast({
        title: "Erro ao enviar informação",
        description: "Ocorreu um erro ao enviar sua informação. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }, [submitError])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
      if (selectedFiles.length > 0) trigger("descricao")
    }
  }

  if (submitSuccess) return <SuccessMessage customContent={successContent} />
  if (submitError) return <ErrorMessage customContent={errorContent} onRetry={resetSubmitStatus} />

  return (
    <form 
      onSubmit={handleSubmit((data) => onSubmit(data, files))}
      className="space-y-6"
      noValidate
      aria-label="Formulário de informação sobre pessoa desaparecida"
    >
      <TextareaField
        name="informacao"
        control={control}
        label="O que você sabe sobre esta pessoa?"
        placeholder="Descreva onde, quando e como você viu esta pessoa, com quem estava, etc"
        rows={isMobile ? 3 : 2}
        isRequired
        hasError={!!errors.informacao}
        errorMessage={errors.informacao?.message}
      />

      <DateField
        name="data"
        control={control}
        label="Data da visualização"
        placeholder=""
        maxDate={new Date().toISOString().split("T")[0]}
        isRequired
        hasError={!!errors.data}
        errorMessage={errors.data?.message}
      />

      <FileUpload 
        files={files}
        onFileChange={handleFileChange}
      />

      <TextareaField
        name="descricao"
        control={control}
        label={`Descrição dos anexos ${hasFiles ? '*' : ''}`}
        placeholder="Descreva o conteúdo das fotos anexadas"
        rows={isMobile ? 3 : 2}
        isRequired={hasFiles}
        hasError={!!errors.descricao}
        errorMessage={errors.descricao?.message}
      />

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting} 
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size={16} text="" />
            <span className="ml-2">Enviando...</span>
          </>
        ) : "Enviar informação"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        <span aria-hidden="true">* </span>Campos obrigatórios
      </p>
    </form>
  )
}