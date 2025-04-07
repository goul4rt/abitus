export type FontSize = "small" | "medium" | "large" | "extra-large"
export type Contrast = "normal" | "high" | "inverted"
export type FontFamily = "default" | "dyslexic" | "sans-serif" | "serif"

export interface AccessibilitySettings {
  fontSize: FontSize
  contrast: Contrast
  fontFamily: FontFamily
  lineSpacing: number
  reduceMotion: boolean
}

export interface AccessibilityContextType extends AccessibilitySettings {
  updateSettings: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void
  resetSettings: () => void
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontSize: "medium",
  contrast: "normal",
  fontFamily: "dyslexic",
  lineSpacing: 1,
  reduceMotion: false,
}

