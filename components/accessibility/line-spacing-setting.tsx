"use client"

import { useAccessibility } from "@/contexts/accessibility"
import { SettingCard } from "./setting-card"

export function LineSpacingSetting() {
  const { lineSpacing, updateSettings } = useAccessibility()

  const spacingOptions = [
    { value: 1, label: "Normal" },
    { value: 1.5, label: "Médio" },
    { value: 2, label: "Amplo" },
  ]

  return (
    <SettingCard
      title="Espaçamento entre linhas"
      description="Ajuste o espaçamento entre linhas para facilitar a leitura"
    >
      <div className="grid grid-cols-3 gap-2">
        {spacingOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSettings("lineSpacing", option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
              lineSpacing === option.value
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50 hover:bg-muted"
            }`}
            aria-pressed={lineSpacing === option.value}
            aria-label={`Espaçamento ${option.label}`}
          >
            <span>{option.label}</span>
            <div className="mt-2 w-full space-y-1">
              <div className="h-1 bg-current rounded-full w-full"></div>
              <div
                className="h-1 bg-current rounded-full w-full"
                style={{ marginTop: `${option.value * 0.25}rem` }}
              ></div>
              <div
                className="h-1 bg-current rounded-full w-full"
                style={{ marginTop: `${option.value * 0.25}rem` }}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </SettingCard>
  )
}

