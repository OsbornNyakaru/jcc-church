import { getSpeakers, getSeries, getTopics } from "@/lib/db/sermons"
import { SermonForm } from "@/components/admin/sermon-form"

export const metadata = {
  title: "Add New Sermon",
  description: "Add a new sermon to the church website",
}

export default async function NewSermonPage() {
  const speakers = (await getSpeakers()).map((speaker: Record<string, any>) => ({
    id: speaker.id,
    name: speaker.name,
  }))
  const series = (await getSeries()).map((serie: Record<string, any>) => ({
    id: serie.id,
    title: serie.title,
  }))
  const topics = (await getTopics()).map((topic: Record<string, any>) => ({
    id: topic.id,
    name: topic.name,
  }))

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Add New Sermon</h1>

      <SermonForm sermon={null} speakers={speakers} series={series} topics={topics} />
    </div>
  )
}
