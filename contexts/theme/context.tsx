"use client"

import { createContext, useContext, type PropsWithChildren } from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme as useNextTheme } from "next-themes"
import { type ThemeContextType } from "./types"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, ...props }: PropsWithChildren<ThemeProviderProps>) {
  const nextTheme = useNextTheme()

  const themeContext: ThemeContextType = {
    theme: nextTheme.theme ?? undefined,
    setTheme: nextTheme.setTheme,
    systemTheme: nextTheme.systemTheme ?? undefined
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <NextThemesProvider {...props} enableSystem={true} enableColorScheme={true}>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
} 