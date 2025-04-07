"use client";

import { type ReactNode } from "react";
import { QueryProvider } from "./query";
import { AccessibilityProvider } from "./accessibility";
import { ThemeProvider } from "./theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
