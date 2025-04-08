import type { FontFamily } from "@/types/accessibility"
import type React from "react"

export interface FontFamilyOption {
  value: FontFamily
  label: string
  style: React.CSSProperties
} 