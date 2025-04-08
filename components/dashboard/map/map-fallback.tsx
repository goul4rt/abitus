"use client"

export default function MapFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border">
      <div className="text-center p-6">
        <h3 className="text-lg font-medium mb-2">Visualização de Mapa</h3>
        <p className="text-muted-foreground">
          O mapa não pôde ser carregado. Verifique sua conexão com a internet e tente novamente.
        </p>
      </div>
    </div>
  )
}

