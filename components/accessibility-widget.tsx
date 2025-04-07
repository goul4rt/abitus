"use client"

import dynamic from "next/dynamic"

const AccessibilityModal = dynamic(
  () => import("./accessibility/accessibility-modal").then((mod) => ({ default: mod.AccessibilityModal })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-primary/50 animate-pulse" />
    ),
  },
)

export function AccessibilityWidget() {
  return <AccessibilityModal />
}

