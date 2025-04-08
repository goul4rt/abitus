"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/contexts/accessibility"
import { FontSizeSetting } from "./font-size-setting"
import { FontFamilySetting } from "./font-family-setting"
import { ContrastSetting } from "./contrast-setting"
import { LineSpacingSetting } from "./line-spacing-setting"
import { MotionSetting } from "./motion-setting"

export function AccessibilityModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<"right" | "left">("right")
  const { resetSettings } = useAccessibility()
  const modalRef = useRef<HTMLDivElement>(null)

  const togglePosition = () => {
    setPosition((prev) => (prev === "right" ? "left" : "right"))
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const modal = modalRef.current
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement.focus()

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    modal.addEventListener("keydown", handleTabKey)

    return () => {
      modal.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`fixed ${position === "right" ? "right-4" : "left-4"} bottom-4 z-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 w-12 shadow-lg`}
        onClick={() => setIsOpen(true)}
        aria-label="Opções de acessibilidade"
      >
        <span className="sr-only">Opções de acessibilidade</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="16" cy="4" r="1" />
          <path d="m18 19-5-7" />
          <path d="m18 5-5 7" />
          <path d="m5 19 5-7" />
          <path d="m5 5 5 7" />
        </svg>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center"
          style={{ justifyContent: position === "right" ? "flex-end" : "flex-start" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div
            ref={modalRef}
            className={`w-full max-w-sm h-full overflow-y-auto bg-background shadow-lg ${position === "right" ? "border-l" : "border-r"}`}
            style={{ animation: `slideIn${position === "right" ? "Right" : "Left"} 0.3s ease-out` }}
          >
            <div className="sticky top-0 z-10 bg-background border-b">
              <div className="p-4 flex items-center justify-between">
                <h2 id="accessibility-title" className="text-xl font-bold">
                  Acessibilidade
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePosition}
                    aria-label={`Mover para ${position === "right" ? "esquerda" : "direita"}`}
                    className="rounded-full"
                  >
                    {position === "right" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar painel de acessibilidade"
                    className="rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="px-4 pb-4 text-sm text-muted-foreground">
                Personalize o site para melhorar sua experiência de navegação
              </p>
            </div>

            <div className="p-4 space-y-6">
              <FontSizeSetting />
              <FontFamilySetting />
              <ContrastSetting />
              <LineSpacingSetting />
              <MotionSetting />

              <div className="pt-4 border-t">
                <Button onClick={resetSettings} aria-label="Restaurar configurações padrão" className="w-full">
                  Restaurar configurações padrão
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccessibilityModal

