import { notFound } from "next/navigation"
import { getSermonById, getSpeakers, getSeries, getTopics } from "@/lib/db/sermons"
import { SermonForm } from "@/components/admin/sermon-form"

export const metadata = {
  title: "Edit Sermon",
  description: "Edit an existing sermon",
}

export default async function EditSermonPage({ params }: { params: { id: string } }) {
  const sermon = await getSermonById(params.id)

  if (!sermon) {
    notFound()
  }

  const speakers = await getSpeakers()
  const series = await getSeries()
  const topics = await getTopics()

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Sermon</h1>

      <SermonForm sermon={sermon} speakers={speakers} series={series} topics={topics} />
    </div>
  )
}
