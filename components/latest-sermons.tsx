import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, User, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getLatestSermons } from "@/lib/sermons"

export async function LatestSermons() {
  const sermons = await getLatestSermons(3)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Latest Sermons</h2>
        <Link href="/media/sermons">
          <Button variant="outline" className="gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
                  <Play className="h-6 w-6" />
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
    </div>
  )
}
