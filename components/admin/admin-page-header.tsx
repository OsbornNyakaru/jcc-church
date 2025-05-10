import type React from "react"
import { cn } from "@/lib/utils"

interface AdminPageHeaderProps {
  heading: string
  subheading?: string
  action?: React.ReactNode
  className?: string
}

export function AdminPageHeader({ heading, subheading, action, className }: AdminPageHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-start justify-between", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
