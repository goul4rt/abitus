"use client"

import dynamic from "next/dynamic"

const AccessibilityModal = dynamic(() => import("@/components/accessibility/AccessibilityModal"), { ssr: false })

export function AccessibilityModalWrapper() {
  return <AccessibilityModal />
}