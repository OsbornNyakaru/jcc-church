import Link from "next/link"
import Image from "next/image"
import { User, Calendar } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSermons } from "@/lib/sermons"
import { PaginationButton } from "@/components/pagination-button"

interface SermonGridProps {
  page?: number
  series?: string
  speaker?: string
  topic?: string
}

export async function SermonGrid({ page = 1, series, speaker, topic }: SermonGridProps) {
  const { sermons, totalSermons } = await getSermons({
    page,
    perPage: 9,
    sort: "date",
    order: "desc",
    series,
    speaker,
    topic,
  })

  const totalPages = Math.ceil(totalSermons / 9)

  if (sermons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No sermons found</h3>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon) => (
          <Card key={sermon.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={sermon.thumbnailUrl || "/placeholder.svg?height=200&width=400"}
                alt={sermon.title}
                width={400}
                height={225}
                className="aspect-video object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary/90 p-3 text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold line-clamp-1">{sermon.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{sermon.speaker}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={sermon.date}>{new Date(sermon.date).toLocaleDateString()}</time>
                </div>
              </div>
              {sermon.seriesTitle && (
                <div className="mt-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    Series: {sermon.seriesTitle}
                  </span>
                </div>
              )}
              <p className="mt-3 line-clamp-2 text-sm">{sermon.description}</p>
              <Link href={`/media/sermons/${sermon.slug}`} className="mt-3 inline-block">
                <Button variant="link" className="h-auto p-0">
                  Watch Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationButton currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
