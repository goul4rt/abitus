import { Button } from "@/components/ui/button";
import { Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PersonDetailsProps } from "./types";
import { PersonHeader } from "../PersonHeader";
import { PersonInfo } from "../PersonInfo";
import { PersonImage } from "../PersonImage";
import { PersonTabs } from "../PersonTabs";
import generateJsonLd from "@/app/json-ld";
import { getPersonStatus } from "@/lib/utils";

export function PersonDetails({
  person,
  onShare,
  onReportClick,
}: PersonDetailsProps) {
  const { nome, idade, sexo, vivo, urlFoto, ultimaOcorrencia, id } = person;
  const { isLocalized, disapearDate } = getPersonStatus(person);

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd("person", person)),
        }}
      />

      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>

        <Button variant="outline" onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PersonImage
          nome={nome}
          urlFoto={urlFoto}
          listaCartaz={ultimaOcorrencia.listaCartaz}
        />

        <div>
          <PersonHeader nome={nome} isLocalized={isLocalized} />

          <PersonInfo
            idade={idade}
            sexo={sexo}
            isLocalized={isLocalized}
            encontradoVivo={ultimaOcorrencia.encontradoVivo}
            vivo={vivo}
          />

          <PersonTabs
            ultimaOcorrencia={ultimaOcorrencia}
            disapearDate={disapearDate}
            isLocalized={isLocalized}
          />

          {!isLocalized && (
            <Button
              size="lg"
              className="w-full"
              onClick={() => onReportClick(id?.toString() || "")}
            >
              Informar sobre esta pessoa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
