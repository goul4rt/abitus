"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react"
import {
  type AccessibilityContextType,
  type AccessibilitySettings,
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from "@/types/accessibility"

const STORAGE_KEY = "accessibility-settings"

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

/**
 * Provider component for accessibility settings
 * Manages state and persistence of user accessibility preferences
 */
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY_SETTINGS)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY)
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings) as Partial<AccessibilitySettings>
        setSettings((prev) => ({
          ...prev,
          ...parsedSettings,
        }))
      }
    } catch (error) {
      console.error("Failed to load accessibility settings:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error("Failed to save accessibility settings:", error)
    }
  }, [settings, isInitialized])

  useEffect(() => {
    if (!isInitialized) return

    const root = document.documentElement
    const body = document.body

    root.classList.remove("text-size-small", "text-size-medium", "text-size-large", "text-size-extra-large")
    root.classList.add(`text-size-${settings.fontSize}`)

    root.classList.remove("contrast-normal", "contrast-high", "contrast-inverted")
    root.classList.add(`contrast-${settings.contrast}`)

    body.style.fontFamily = getFontFamilyValue(settings.fontFamily)

    body.classList.remove("font-default", "font-dyslexic", "font-sans-serif", "font-serif")
    body.classList.add(`font-${settings.fontFamily}`)

    root.style.setProperty("--line-spacing", settings.lineSpacing.toString())

    if (settings.reduceMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }
  }, [settings, isInitialized])

  const getFontFamilyValue = (fontFamily: string): string => {
    switch (fontFamily) {
      case "dyslexic":
        return "'OpenDyslexic', sans-serif"
      case "sans-serif":
        return "Arial, Helvetica, sans-serif"
      case "serif":
        return "Georgia, 'Times New Roman', serif"
      case "default":
      default:
        return "var(--font-sans)"
    }
  }

  const updateSettings = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS)
  }, [])

  const contextValue = useMemo(
    () => ({
      ...settings,
      updateSettings,
      resetSettings,
    }),
    [settings, updateSettings, resetSettings],
  )

  return <AccessibilityContext.Provider value={contextValue}>{children}</AccessibilityContext.Provider>
}

/**
 * Hook to access accessibility settings and functions
 * @throws Error if used outside of AccessibilityProvider
 */
export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext)

  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }

  return context
}

