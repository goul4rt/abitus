import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { PersonImageProps } from "./types";

export function PersonImage({ nome, urlFoto, listaCartaz }: PersonImageProps) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-full max-w-md h-auto aspect-square rounded-lg border">
        <AvatarImage
          src={urlFoto || "/placeholder.svg"}
          alt={nome}
          className="object-cover h-auto w-full rounded-lg aspect-square "
        />
        <AvatarFallback className="text-muted-foreground flex items-center justify-center h-full w-full">
          <p className="text-center">Sem foto disponível</p>
        </AvatarFallback>
      </Avatar>

      {listaCartaz && listaCartaz.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="font-medium mb-3">Cartazes disponíveis:</h3>
          <div className="grid grid-cols-2 gap-3">
            {listaCartaz.map((cartaz, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:border-primary transition-colors"
              >
                <a
                  href={cartaz.urlCartaz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 h-full"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {cartaz.tipoCartaz === "PDF_DESAPARECIDO"
                        ? "Cartaz PDF"
                        : cartaz.tipoCartaz}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    Clique para visualizar
                  </p>
                </a>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 