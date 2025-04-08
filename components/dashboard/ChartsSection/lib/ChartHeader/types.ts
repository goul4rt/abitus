export interface ChartHeaderProps {
  totalLoaded: number
  totalAvailable: number
  pagesLoaded?: number
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
} 