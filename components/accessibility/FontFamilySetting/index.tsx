"use client"

import type React from "react"
import { useAccessibility } from "@/contexts/accessibility"
import type { FontFamily } from "@/types/accessibility"
import { SettingCard } from "../SettingCard"
import type { FontFamilyOption } from "./types"

const fontFamilyOptions: Array<FontFamilyOption> = [
  { value: "dyslexic", label: "Dislexia", style: { fontFamily: "'OpenDyslexic', sans-serif" } },
  { value: "default", label: "Sistema", style: { fontFamily: "var(--font-sans)" } },
  { value: "sans-serif", label: "Sans-serif", style: { fontFamily: "Arial, sans-serif" } },
  { value: "serif", label: "Serif", style: { fontFamily: "Georgia, serif" } },
]

export function FontFamilySetting() {
  const { fontFamily, updateSettings } = useAccessibility()

  return (
    <SettingCard title="Tipo de fonte" description="Escolha a fonte que melhor se adapta às suas necessidades">
      <div className="grid grid-cols-2 gap-2">
        {fontFamilyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSettings("fontFamily", option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
              fontFamily === option.value
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50 hover:bg-muted"
            }`}
            aria-pressed={fontFamily === option.value}
            aria-label={`Fonte ${option.label}`}
            style={option.style}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </SettingCard>
  )
} 