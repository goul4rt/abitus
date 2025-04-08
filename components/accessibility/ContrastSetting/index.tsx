"use client"

import { useAccessibility } from "@/contexts/accessibility"
import type { Contrast } from "@/types/accessibility"
import { SettingCard } from "../SettingCard"
import type { ContrastOption } from "./types"

const contrastOptions: Array<ContrastOption> = [
  { value: "normal", label: "Normal", className: "" },
  { value: "high", label: "Alto contraste", className: "font-bold" },
  { value: "inverted", label: "Invertido", className: "bg-black text-white px-1" },
]

export function ContrastSetting() {
  const { contrast, updateSettings } = useAccessibility()

  return (
    <SettingCard title="Contraste" description="Ajuste o contraste para melhorar a visibilidade">
      <div className="grid grid-cols-3 gap-2">
        {contrastOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSettings("contrast", option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
              contrast === option.value
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50 hover:bg-muted"
            }`}
            aria-pressed={contrast === option.value}
            aria-label={`Contraste ${option.label}`}
          >
            <span className={option.className}>{option.label}</span>
          </button>
        ))}
      </div>
    </SettingCard>
  )
} 