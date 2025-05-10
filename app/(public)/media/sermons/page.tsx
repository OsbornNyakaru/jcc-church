import type { Metadata } from "next"
import { Suspense } from "react"

import { SermonFilters } from "@/components/sermon-filters"
import { SermonGrid } from "@/components/sermon-grid"
import { SermonGridSkeleton } from "@/components/sermon-grid-skeleton"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and listen to our sermon archive.",
}

export default function SermonsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1
  const series = typeof searchParams.series === "string" ? searchParams.series : undefined
  const speaker = typeof searchParams.speaker === "string" ? searchParams.speaker : undefined
  const topic = typeof searchParams.topic === "string" ? searchParams.topic : undefined

  return (
    <div className="container py-8">
      <PageHeader heading="Sermon Archive" subheading="Watch and listen to our past sermons and messages" />

      <SermonFilters />

      <Suspense fallback={<SermonGridSkeleton />}>
        <SermonGrid page={page} series={series} speaker={speaker} topic={topic} />
      </Suspense>
    </div>
  )
}
