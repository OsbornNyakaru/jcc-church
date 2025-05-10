import Link from "next/link"
import Image from "next/image"
import { User, Calendar, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface SermonCardProps {
  sermon: {
    id: string
    title: string
    slug: string
    description: string
    date: string
    speaker: string
    thumbnailUrl?: string
    seriesTitle?: string
  }
  variant?: "default" | "horizontal"
}

export function SermonCard({ sermon, variant = "default" }: SermonCardProps) {
  return (
    <Link
      href={`/media/sermons/${sermon.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border transition-colors hover:bg-accent/50",
        variant === "horizontal" ? "flex gap-4" : "",
      )}
    >
      <div
        className={cn("relative", variant === "default" ? "aspect-video w-full" : "aspect-square h-24 w-24 shrink-0")}
      >
        <Image
          src={sermon.thumbnailUrl || "/placeholder.svg?height=200&width=400"}
          alt={sermon.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-primary/90 p-2 text-primary-foreground">
            <Play className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className={cn("p-3", variant === "horizontal" ? "flex-1" : "")}>
        <h3 className={cn("font-bold line-clamp-1", variant === "default" ? "text-lg" : "text-base")}>
          {sermon.title}
        </h3>

        <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{sermon.speaker}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={sermon.date}>{new Date(sermon.date).toLocaleDateString()}</time>
          </div>
        </div>

        {sermon.seriesTitle && (
          <div className="mt-1">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium">Series: {sermon.seriesTitle}</span>
          </div>
        )}

        {variant === "default" && <p className="mt-2 line-clamp-2 text-sm">{sermon.description}</p>}
      </div>
    </Link>
  )
}
