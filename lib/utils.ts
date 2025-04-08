import { PessoaDesaparecida, PessoasParams, PessoasResponse } from "@/services/people/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  if (!dateString) {
     return "Data não informada"
  }

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

export function loadFromStorage<T>(key: string): Partial<T> | null {
  try {
    const savedData = localStorage.getItem(key)
    if (savedData) {
      return JSON.parse(savedData) as Partial<T>
    }
  } catch (error) {
    console.error(`Failed to load data from storage (${key}):`, error)
  }
  return null
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Failed to save data to storage (${key}):`, error)
  }
}

export function isLocalized(person: PessoaDesaparecida) {
  return !!(person.ultimaOcorrencia.dataLocalizacao || person.ultimaOcorrencia.dataLocalizacao)
}

export function getPersonStatus(person?: PessoaDesaparecida) {
  if(!person) return { statusText: "", statusDate: "", isLocalized: false }
  const isFound = isLocalized(person)
  const statusText  = !isFound ? "Desaparecido" : "Localizado"
  const statusDate = !isFound ? formatDate(person.ultimaOcorrencia.dtDesaparecimento) : formatDate(person.ultimaOcorrencia.dataLocalizacao || "")
  const disapearDate = formatDate(person.ultimaOcorrencia.dtDesaparecimento)
  return { statusText, statusDate, isLocalized: isFound, disapearDate }
}
