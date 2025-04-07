"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  type AccessibilityContextType,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  type AccessibilitySettings,
} from "./types";
import { loadFromStorage, saveToStorage } from "@/lib/utils";
import { applyAccessibilityStyles } from "./utils";
import { STORAGE_KEY } from "./constants";

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState(DEFAULT_ACCESSIBILITY_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedSettings = loadFromStorage<AccessibilitySettings>(STORAGE_KEY);
    if (savedSettings) {
      setSettings((prev) => ({
        ...prev,
        ...savedSettings,
      }));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    saveToStorage(STORAGE_KEY, settings);
  }, [settings, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    applyAccessibilityStyles(settings);
  }, [settings, isInitialized]);

  const updateSettings = useCallback(
    <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  }, []);

  const contextValue = useMemo(
    () => ({
      ...settings,
      updateSettings,
      resetSettings,
    }),
    [settings, updateSettings, resetSettings]
  );

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);

  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }

  return context;
}
