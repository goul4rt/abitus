"use client"

import { Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAccessibilityModal } from "@/hooks/use-accessibility-modal"

export function AccessibilityButton() {
  const { openModal } = useAccessibilityModal()

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 w-12 shadow-lg"
      onClick={openModal}
      aria-label="Opções de acessibilidade"
    >
      <Accessibility className="h-6 w-6" />
    </Button>
  )
}

