"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useSubmitPersonInformation } from "@/services/ocorrences"
import ReportForm from "@/components/reports/ReportForm"
import { FormData } from "@/components/reports/ReportForm/types"

export default function ReportInformationPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const {
    mutate: submitInfo,
    isPending: isSubmitting,
    isSuccess: submitSuccess,
    isError: submitError,
    reset: resetSubmitStatus,
  } = useSubmitPersonInformation()

  const handleSubmit = (formData: FormData, files: File[]) => {
    submitInfo({ 
      ocoId: id as string,
      formData,
      files
    })
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
              Preencha o formulário abaixo com informações que possam ajudar a localizar esta pessoa.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ReportForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              submitError={submitError}
              resetSubmitStatus={resetSubmitStatus}
              id={id as string}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

