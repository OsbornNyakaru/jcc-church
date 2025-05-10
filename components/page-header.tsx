import { cn } from "@/lib/utils"

interface PageHeaderProps {
  heading: string
  subheading?: string
  className?: string
}

export function PageHeader({ heading, subheading, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{heading}</h1>
      {subheading && <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{subheading}</p>}
    </div>
  )
}
