"use client"
import { useAccessibility } from "@/contexts/accessibility-context"
import type { FontSize } from "@/types/accessibility"
import { SettingCard } from "./setting-card"

const fontSizeOptions: Array<{ value: FontSize; label: string; className: string }> = [
  { value: "small", label: "Pequena", className: "text-sm" },
  { value: "medium", label: "Média", className: "text-base" },
  { value: "large", label: "Grande", className: "text-lg" },
  { value: "extra-large", label: "Extra grande", className: "text-xl" },
]

export function FontSizeSetting() {
  const { fontSize, updateSettings } = useAccessibility()

  return (
    <SettingCard title="Tamanho da fonte" description="Ajuste o tamanho do texto para melhor legibilidade">
      <div className="grid grid-cols-2 gap-2">
        {fontSizeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSettings("fontSize", option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
              fontSize === option.value
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50 hover:bg-muted"
            }`}
            aria-pressed={fontSize === option.value}
            aria-label={`Tamanho de fonte ${option.label}`}
          >
            <span className={option.className}>{option.label}</span>
          </button>
        ))}
      </div>
    </SettingCard>
  )
}

