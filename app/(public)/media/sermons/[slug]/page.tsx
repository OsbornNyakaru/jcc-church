import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Download, User } from "lucide-react"

import { getSermonBySlug, getRelatedSermons } from "@/lib/sermons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { VideoPlayer } from "@/components/video-player"
import { SermonCard } from "@/components/sermon-card"
import { ShareButtons } from "@/components/share-buttons"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const sermon = await getSermonBySlug(params.slug)

  if (!sermon) {
    return {}
  }

  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
      title: sermon.title,
      description: sermon.description,
      type: "article",
      publishedTime: sermon.date,
      authors: [sermon.speaker],
      images: [
        {
          url: sermon.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: sermon.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: sermon.title,
      description: sermon.description,
      images: [sermon.thumbnailUrl],
    },
  }
}

export default async function SermonPage({
  params,
}: {
  params: { slug: string }
}) {
  const sermon = await getSermonBySlug(params.slug)

  if (!sermon) {
    notFound()
  }

  const relatedSermons = await getRelatedSermons(sermon.id, sermon.seriesId)

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VideoPlayer videoId={sermon.videoId} />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">{sermon.title}</h1>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <Link href={`/media/sermons?speaker=${sermon.speakerId}`} className="hover:underline">
                  {sermon.speaker}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={sermon.date}>{new Date(sermon.date).toLocaleDateString()}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {sermon.duration}
              </div>
            </div>

            {sermon.seriesTitle && (
              <Link href={`/media/sermons?series=${sermon.seriesId}`} className="mt-4 inline-block">
                <div className="rounded-md bg-muted px-3 py-1 text-sm font-medium">Series: {sermon.seriesTitle}</div>
              </Link>
            )}

            <Separator className="my-6" />

            <div className="prose max-w-none dark:prose-invert">
              <p>{sermon.description}</p>
              <div dangerouslySetInnerHTML={{ __html: sermon.content }} />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Audio
              </Button>
              <ShareButtons title={sermon.title} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">More From This Series</h2>
          <div className="grid gap-4">
            {relatedSermons.map((relatedSermon) => (
              <SermonCard key={relatedSermon.id} sermon={relatedSermon} variant="horizontal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
