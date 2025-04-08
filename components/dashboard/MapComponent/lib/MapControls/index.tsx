import { Button } from "@/components/ui/button"

interface MapControlsProps {
  totalLoaded: number
  totalAvailable: number
  pagesLoaded: number
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

export function MapControls({
  totalLoaded,
  totalAvailable,
  pagesLoaded,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore
}: MapControlsProps) {
  return (
    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-muted/30 rounded-md">
      <div className="text-sm text-muted-foreground">
        Mostrando <span className="font-medium">{totalLoaded}</span> de <span className="font-medium">{totalAvailable}</span> registros
        {pagesLoaded > 1 && (
          <span className="ml-1">({pagesLoaded} páginas carregadas)</span>
        )}
      </div>
      
      {hasNextPage && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Carregando..." : "Carregar mais dados"}
        </Button>
      )}
    </div>
  )
} 