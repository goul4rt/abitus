"use client"

import { useChartData } from "@/hooks/use-chart-mobile"
import {
  GenderChart,
  StatusChart,
  AgeChart,
  ChartHeader,
  LoadingIndicator,
  ErrorDisplay
} from "./lib"

export function ChartsSection() {
  const {
    genderData,
    ageData,
    statusData,
    totalLoaded,
    totalAvailable,
    data,
    handleLoadMore,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  } = useChartData()

  if (isError) {
    return <ErrorDisplay error={error} />
  }

  return (
    <div className="space-y-6">
      <ChartHeader
        totalLoaded={totalLoaded}
        totalAvailable={totalAvailable}
        pagesLoaded={data?.pages.length}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GenderChart data={genderData} />
        <StatusChart data={statusData} />
        <AgeChart data={ageData} />
      </div>

      <LoadingIndicator isLoading={isFetching && !isFetchingNextPage} />
    </div>
  )
} 