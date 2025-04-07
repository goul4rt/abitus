import { type ReactNode } from "react";

export type AccessibilitySettings = {
  fontSize: "small" | "medium" | "large" | "extra-large";
  contrast: "normal" | "high" | "inverted";
  fontFamily: "default" | "dyslexic" | "sans-serif" | "serif";
  lineSpacing: number;
  reduceMotion: boolean;
};

export type AccessibilityContextType = AccessibilitySettings & {
  updateSettings: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontSize: "medium",
  contrast: "normal",
  fontFamily: "default",
  lineSpacing: 1.5,
  reduceMotion: false,
};
