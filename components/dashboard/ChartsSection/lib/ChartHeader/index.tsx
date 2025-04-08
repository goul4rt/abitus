import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ChartHeaderProps } from "./types"

export function ChartHeader({
  totalLoaded,
  totalAvailable,
  pagesLoaded,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore
}: ChartHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-muted/30 rounded-md">
      <div className="text-sm text-muted-foreground">
        Análise baseada em <span className="font-medium">{totalLoaded}</span> de{" "}
        <span className="font-medium">{totalAvailable}</span> registros
        {pagesLoaded && pagesLoaded > 1 && (
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
          {isFetchingNextPage ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando
            </>
          ) : (
            "Carregar mais dados"
          )}
        </Button>
      )}
    </div>
  )
} 