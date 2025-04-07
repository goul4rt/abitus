import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  if (!dateString) return "Data não informada"

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

