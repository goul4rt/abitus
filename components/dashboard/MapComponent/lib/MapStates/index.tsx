import React from "react"

interface StateContainerProps {
  children: React.ReactNode
  ariaLabel: string
  role: string
}

function StateContainer({ children, ariaLabel, role }: StateContainerProps) {
  return (
    <div
      className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border"
      aria-label={ariaLabel}
      role={role}
    >
      <div className="text-center p-6">
        {children}
      </div>
    </div>
  )
}

export function MapLoadingState() {
  return (
    <StateContainer ariaLabel="Carregando mapa" role="status">
      <h3 className="text-lg font-medium mb-2">Carregando Mapa</h3>
      <p className="text-muted-foreground">O mapa está sendo inicializado...</p>
    </StateContainer>
  )
}

export function MapErrorState({ error }: { error: unknown }) {
  const errorMessage = error instanceof Error ? error.message : "Erro ao carregar dados do mapa"
  
  return (
    <StateContainer ariaLabel="Erro ao carregar mapa" role="alert">
      <h3 className="text-lg font-medium mb-2 text-destructive">Erro</h3>
      <p className="text-muted-foreground">{errorMessage}</p>
    </StateContainer>
  )
}

export function MapEmptyState() {
  return (
    <StateContainer ariaLabel="Sem dados no mapa" role="status">
      <h3 className="text-lg font-medium mb-2">Sem dados disponíveis</h3>
      <p className="text-muted-foreground">Não há dados de localização para exibir no mapa</p>
    </StateContainer>
  )
}

export function MapLoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-md">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="text-center">Carregando dados...</p>
      </div>
    </div>
  )
} 