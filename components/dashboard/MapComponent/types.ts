export interface HeatmapPoint {
  lat: number
  lng: number
  weight: number
  name: string
  count: number
  ids: number[]
}

export interface LocationGroup {
  [key: string]: {
    lat: number
    lng: number
    count: number
    ids: number[]
  }
} 