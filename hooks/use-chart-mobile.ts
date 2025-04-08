import { useMemo } from "react"
import { isLocalized } from "@/lib/utils"
import { useInfiniteMissingPersons } from "@/services/people/service"
import { PessoaDesaparecida } from "@/services/people/types"
import { 
  ProcessedChartData, 
  GenderCount, 
  AgeGroups, 
  StatusCount 
} from "../components/dashboard/ChartsSection/types"
import { CHART_COLORS } from "../components/dashboard/ChartsSection/constants"

export function useChartData() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteMissingPersons(
    { porPagina: 100 },
    { staleTime: 1000 * 60 * 5 }
  )

  const processedData = useMemo<ProcessedChartData>(() => {
    if (!data?.pages?.length) {
      return {
        genderData: [],
        ageData: [],
        statusData: [],
        totalLoaded: 0,
        totalAvailable: 0
      }
    }

    const allPeople = data.pages.flatMap(page => page.content)
    const totalLoaded = allPeople.length
    const totalAvailable = data.pages[0]?.totalElements || 0

    const genderCount: GenderCount = {
      MASCULINO: 0,
      FEMININO: 0
    }

    const ageGroups: AgeGroups = {
      "0-12": 0,
      "13-17": 0,
      "18-25": 0,
      "26-40": 0,
      "41-59": 0,
      "60+": 0
    }

    allPeople.forEach((pessoa: PessoaDesaparecida) => {
      if (pessoa.sexo) {
        genderCount[pessoa.sexo]++
      }

      const idade = pessoa.idade
      if (idade !== undefined) {
        if (idade <= 12) ageGroups["0-12"]++
        else if (idade <= 17) ageGroups["13-17"]++
        else if (idade <= 25) ageGroups["18-25"]++
        else if (idade <= 40) ageGroups["26-40"]++
        else if (idade <= 59) ageGroups["41-59"]++
        else ageGroups["60+"]++
      }
    })

    const genderData = [
      { name: "Masculino", value: genderCount.MASCULINO, fill: CHART_COLORS.GENDER.MASCULINO },
      { name: "Feminino", value: genderCount.FEMININO, fill: CHART_COLORS.GENDER.FEMININO }
    ]

    const ageData = Object.entries(ageGroups).map(([range, count]) => ({
      name: range,
      value: count,
      fill: CHART_COLORS.AGE
    }))

    return {
      genderData,
      ageData,
      totalLoaded,
      totalAvailable
    }
  }, [data])

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return {
    ...processedData,
    data,
    handleLoadMore,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  }
} 