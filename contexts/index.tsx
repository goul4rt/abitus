"use client";

import { type ReactNode } from "react";
import { QueryProvider } from "./query";
import { AccessibilityProvider } from "./accessibility";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </QueryProvider>
  );
}
