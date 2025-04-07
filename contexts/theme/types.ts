export type ThemeContextType = {
  theme: string | undefined
  setTheme: (theme: string) => void
  systemTheme: string | undefined
}

export const DEFAULT_THEME = "light" 