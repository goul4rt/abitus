"use client"

import { useAccessibility } from "@/contexts/accessibility"
import { SettingCard } from "./setting-card"

export function MotionSetting() {
  const { reduceMotion, updateSettings } = useAccessibility()

  return (
    <SettingCard title="Animações" description="Controle as animações e transições do site">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => updateSettings("reduceMotion", false)}
          className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
            !reduceMotion ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50 hover:bg-muted"
          }`}
          aria-pressed={!reduceMotion}
          aria-label="Animações normais"
        >
          <span>Normais</span>
          <div className="mt-2 relative">
            <div className="h-2 w-2 bg-current rounded-full absolute animate-ping"></div>
            <div className="h-2 w-2 bg-current rounded-full"></div>
          </div>
        </button>

        <button
          onClick={() => updateSettings("reduceMotion", true)}
          className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
            reduceMotion ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50 hover:bg-muted"
          }`}
          aria-pressed={reduceMotion}
          aria-label="Reduzir animações"
        >
          <span>Reduzidas</span>
          <div className="mt-2">
            <div className="h-2 w-2 bg-current rounded-full"></div>
          </div>
        </button>
      </div>
    </SettingCard>
  )
}

