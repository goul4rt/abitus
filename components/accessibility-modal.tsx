"use client"

import { useState, useEffect } from "react"
import { Accessibility, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useAccessibility } from "@/contexts/accessibility"
import type { FontSize, FontFamily, Contrast } from "@/types/accessibility"

export default function AccessibilityModal() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    fontSize,
    contrast,
    fontFamily,
    lineSpacing,
    reduceMotion,
    updateSettings,
    resetSettings,
  } = useAccessibility()

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
    if (!isOpen) return

    const modal = document.getElementById("accessibility-modal")
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

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

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 w-12 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Opções de acessibilidade"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
          <div
            id="accessibility-modal"
            className="w-full max-w-md h-full overflow-y-auto bg-background p-4 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            <Card className="border-none shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle id="accessibility-title">Acessibilidade</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar painel de acessibilidade"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Personalize o site para melhorar sua experiência de navegação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="font-size">Tamanho da fonte</Label>
                  <RadioGroup
                    id="font-size"
                    value={fontSize}
                    onValueChange={(value) => updateSettings("fontSize", value as FontSize)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="small" id="font-small" className="peer sr-only" />
                      <Label
                        htmlFor="font-small"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm">Pequena</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="medium" id="font-medium" className="peer sr-only" />
                      <Label
                        htmlFor="font-medium"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-base">Média</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="large" id="font-large" className="peer sr-only" />
                      <Label
                        htmlFor="font-large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-lg">Grande</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="extra-large" id="font-extra-large" className="peer sr-only" />
                      <Label
                        htmlFor="font-extra-large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl">Extra grande</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-family">Tipo de fonte</Label>
                  <RadioGroup
                    id="font-family"
                    value={fontFamily}
                    onValueChange={(value) => updateSettings("fontFamily", value as FontFamily)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="default" id="font-default" className="peer sr-only" />
                      <Label
                        htmlFor="font-default"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span style={{ fontFamily: "var(--font-sans)" }}>Padrão</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dyslexic" id="font-dyslexic" className="peer sr-only" />
                      <Label
                        htmlFor="font-dyslexic"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span style={{ fontFamily: "var(--font-dyslexic)" }}>Dislexia</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sans-serif" id="font-sans" className="peer sr-only" />
                      <Label
                        htmlFor="font-sans"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span style={{ fontFamily: "Arial, sans-serif" }}>Sans-serif</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="serif" id="font-serif" className="peer sr-only" />
                      <Label
                        htmlFor="font-serif"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span style={{ fontFamily: "Georgia, serif" }}>Serif</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contrast">Contraste</Label>
                  <RadioGroup
                    id="contrast"
                    value={contrast}
                    onValueChange={(value) => updateSettings("contrast", value as Contrast)}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="normal" id="contrast-normal" className="peer sr-only" />
                      <Label
                        htmlFor="contrast-normal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>Normal</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="high" id="contrast-high" className="peer sr-only" />
                      <Label
                        htmlFor="contrast-high"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-bold">Alto contraste</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="inverted" id="contrast-inverted" className="peer sr-only" />
                      <Label
                        htmlFor="contrast-inverted"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="bg-black text-white px-1">Invertido</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="line-spacing">Espaçamento entre linhas</Label>
                    <span className="text-sm text-muted-foreground">{lineSpacing.toFixed(1)}x</span>
                  </div>
                  <Slider
                    id="line-spacing"
                    min={1}
                    max={2}
                    step={0.1}
                    value={[lineSpacing]}
                    onValueChange={(value) => updateSettings("lineSpacing", value[0])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Normal</span>
                    <span>Amplo</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduce-motion">Reduzir animações</Label>
                    <p className="text-sm text-muted-foreground">Desativa ou reduz animações e transições</p>
                  </div>
                  <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={(checked) => updateSettings("reduceMotion", checked)} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetSettings}>
                  Restaurar padrões
                </Button>
                <Button onClick={() => setIsOpen(false)}>Fechar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

