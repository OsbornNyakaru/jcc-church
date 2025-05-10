import { Suspense } from "react"
import { getSermons } from "@/lib/db/sermons"
import { SermonDataTable } from "@/components/admin/sermon-data-table"

export const metadata = {
  title: "Manage Sermons",
  description: "Add, edit, and delete sermon content",
}

interface AdminSermonsPageProps {
  searchParams: {
    page?: string
    search?: string
    sort?: string
    order?: string
  }
}

export default function AdminSermonsPage({ searchParams }: AdminSermonsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Sermons</h1>

      <Suspense fallback={<div>Loading sermons...</div>}>
        <SermonList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function SermonList({ searchParams }: AdminSermonsPageProps) {
  const page = Number(searchParams.page) || 1
  const search = searchParams.search || ""
  const sort = searchParams.sort || "date"
  const order = (searchParams.order || "desc") as "asc" | "desc"

  const { sermons, totalSermons } = await getSermons({
    page,
    perPage: 10,
    sort,
    order,
    search,
  })

  // Transform data for the data table
  const formattedSermons = sermons.map((sermon) => ({
    id: sermon.id,
    title: sermon.title,
    slug: sermon.slug,
    speaker: sermon.speaker,
    date: sermon.date,
    seriesTitle: sermon.series,
    status: "published",
    views: sermon.view_count || 0,
  }))

  const pageCount = Math.ceil(totalSermons / 10)

  return <SermonDataTable data={formattedSermons} pageCount={pageCount} />
}
