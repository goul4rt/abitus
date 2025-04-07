import type { ReactNode } from "react"

interface SettingCardProps {
  title?: string
  description?: string
  children: ReactNode
}

export function SettingCard({ title, description, children }: SettingCardProps) {
  return (
    <div className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
      {(title || description) && (
        <div>
          {title && <h3 className="text-base font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

