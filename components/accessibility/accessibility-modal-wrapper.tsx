"use client"

import dynamic from "next/dynamic"

const AccessibilityModal = dynamic(() => import("@/components/accessibility/accessibility-modal"), { ssr: false })

export function AccessibilityModalWrapper() {
  return <AccessibilityModal />
} 