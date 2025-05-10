import { getSpeakers, getSeries, getTopics } from "@/lib/db/sermons"
import { SermonForm } from "@/components/admin/sermon-form"

export const metadata = {
  title: "Add New Sermon",
  description: "Add a new sermon to the church website",
}

export default async function NewSermonPage() {
  const speakers = await getSpeakers()
  const series = await getSeries()
  const topics = await getTopics()

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Add New Sermon</h1>

      <SermonForm sermon={null} speakers={speakers} series={series} topics={topics} />
    </div>
  )
}
