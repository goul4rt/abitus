export interface ChartData {
  name: string
  value: number
  fill: string
}

export interface ProcessedChartData {
  genderData: ChartData[]
  ageData: ChartData[]
  totalLoaded: number
  totalAvailable: number
}

export interface GenderCount {
  MASCULINO: number
  FEMININO: number
}

export interface AgeGroups {
  "0-12": number
  "13-17": number
  "18-25": number
  "26-40": number
  "41-59": number
  "60+": number
}

export interface StatusCount {
  encontrado: number
  desaparecido: number
} 