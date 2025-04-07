"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, Check, AlertCircle } from "lucide-react"
import { useSubmitPersonInformation } from "@/services/ocorrences"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import LoadingSpinner from "@/components/loading-spinner"

export default function ReportInformationPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const [formData, setFormData] = useState({
    informacao: "",
    descricao: "",
    data: "",
  })

  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})

  const {
    mutate: submitInfo,
    isPending: isSubmitting,
    isSuccess: submitSuccess,
    isError: submitError,
    reset: resetSubmitStatus,
  } = useSubmitPersonInformation()

  useEffect(() => {
    if (submitSuccess) {
      setFormData({
        informacao: "",
        descricao: "",
        data: "",
      })
      setFiles([])

      toast({
        title: "Informação enviada",
        description: "Sua informação foi enviada com sucesso. Obrigado pela contribuição.",
        variant: "default",
      })

      const redirectTimer = setTimeout(() => {
        router.push(`/person/${id}`)
      }, 2000)

      return () => clearTimeout(redirectTimer)
    }
  }, [submitSuccess, router, id])

  useEffect(() => {
    if (submitError) {
      toast({
        title: "Erro ao enviar informação",
        description: "Ocorreu um erro ao enviar sua informação. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }, [submitError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)

    if (errors.files) {
      setErrors((prev) => ({ ...prev, files: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.informacao.trim()) {
      newErrors.informacao = "Por favor, informe o que você sabe sobre esta pessoa"
    }

    if (!formData.data) {
      newErrors.data = "Por favor, informe a data da visualização"
    } else {
      const selectedDate = new Date(formData.data)
      const today = new Date()
      if (selectedDate > today) {
        newErrors.data = "A data não pode ser futura"
      }
    }

    if (!formData.descricao.trim() && files.length > 0) {
      newErrors.descricao = "Por favor, descreva os anexos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, corrija os erros no formulário antes de enviar.",
        variant: "destructive",
      })

      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField && document.getElementById(firstErrorField)) {
        document.getElementById(firstErrorField).focus()
      }

      return
    }

    submitInfo({ ocoId: id, formData, files })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()} aria-label="Voltar para a página anterior">
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Voltar
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Informar sobre pessoa desaparecida</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo com informações que possam ajudar a localizar esta pessoa. Todas as
              informações são confidenciais e serão analisadas pela Polícia Judiciária Civil.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitSuccess ? (
              <div
                className="flex flex-col items-center justify-center py-8 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="rounded-full bg-green-100 p-3 mb-4" aria-hidden="true">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Informação enviada com sucesso!</h3>
                <p className="text-muted-foreground">
                  Obrigado por contribuir. Sua informação será analisada pelas autoridades.
                </p>
              </div>
            ) : submitError ? (
              <div className="flex flex-col items-center justify-center py-8 text-center" role="alert">
                <div className="rounded-full bg-red-100 p-3 mb-4" aria-hidden="true">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Erro ao enviar informação</h3>
                <p className="text-muted-foreground mb-4">
                  Ocorreu um erro ao enviar sua informação. Por favor, tente novamente.
                </p>
                <Button onClick={() => resetSubmitStatus()}>Tentar novamente</Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-label="Formulário de informação sobre pessoa desaparecida"
              >
                <div className="space-y-2">
                  <Label htmlFor="informacao" className={cn(errors.informacao && "text-destructive")}>
                    O que você sabe sobre esta pessoa? <span aria-hidden="true">*</span>
                    <span className="sr-only">obrigatório</span>
                  </Label>
                  <Textarea
                    id="informacao"
                    name="informacao"
                    placeholder="Descreva onde, quando e como você viu esta pessoa, o que ela estava fazendo, com quem estava, etc."
                    rows={5}
                    value={formData.informacao}
                    onChange={handleInputChange}
                    className={cn(errors.informacao && "border-destructive")}
                    aria-required="true"
                    aria-invalid={errors.informacao ? "true" : "false"}
                    aria-describedby={errors.informacao ? "informacao-error" : undefined}
                  />
                  {errors.informacao && (
                    <p className="text-sm text-destructive" id="informacao-error" role="alert">
                      {errors.informacao}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data" className={cn(errors.data && "text-destructive")}>
                    Data da visualização <span aria-hidden="true">*</span>
                    <span className="sr-only">obrigatório</span>
                  </Label>
                  <Input
                    id="data"
                    name="data"
                    type="date"
                    value={formData.data}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={cn(errors.data && "border-destructive")}
                    aria-required="true"
                    aria-invalid={errors.data ? "true" : "false"}
                    aria-describedby={errors.data ? "data-error" : undefined}
                  />
                  {errors.data && (
                    <p className="text-sm text-destructive" id="data-error" role="alert">
                      {errors.data}
                    </p>
                  )}
                </div>

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
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" aria-hidden="true" />
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG ou JPEG (máx. 10MB)</p>
                      </div>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleFileChange}
                        aria-label="Anexar fotos"
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

                <div className="space-y-2">
                  <Label htmlFor="descricao" className={cn(errors.descricao && "text-destructive")}>
                    Descrição dos anexos {files.length > 0 && <span aria-hidden="true">*</span>}
                    {files.length > 0 && <span className="sr-only">obrigatório</span>}
                  </Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva o conteúdo das fotos anexadas"
                    rows={3}
                    value={formData.descricao}
                    onChange={handleInputChange}
                    className={cn(errors.descricao && "border-destructive")}
                    aria-required={files.length > 0 ? "true" : "false"}
                    aria-invalid={errors.descricao ? "true" : "false"}
                    aria-describedby={errors.descricao ? "descricao-error" : undefined}
                  />
                  {errors.descricao && (
                    <p className="text-sm text-destructive" id="descricao-error" role="alert">
                      {errors.descricao}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size={16} text="" className="mr-2" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar informação"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  <span aria-hidden="true">* </span>Campos obrigatórios
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

