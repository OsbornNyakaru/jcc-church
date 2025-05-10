import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { SermonForm } from "@/components/admin/sermon-form"
import { getSermonById, getSpeakers, getSeries, getTopics } from "@/lib/sermons"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  if (params.id === "new") {
    return {
      title: "Add New Sermon",
    }
  }

  const sermon = await getSermonById(params.id)

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    }
  }

  return {
    title: `Edit Sermon: ${sermon.title}`,
  }
}

export default async function AdminSermonPage({
  params,
}: {
  params: { id: string }
}) {
  const isNew = params.id === "new"

  const sermon = isNew ? null : await getSermonById(params.id)

  if (!isNew && !sermon) {
    notFound()
  }

  const [speakers, series, topics] = await Promise.all([getSpeakers(), getSeries(), getTopics()])

  return (
    <div>
      <AdminPageHeader
        heading={isNew ? "Add New Sermon" : `Edit Sermon: ${sermon?.title}`}
        subheading={isNew ? "Create a new sermon entry" : "Update sermon details and media"}
      />

      <div className="mt-6">
        <SermonForm sermon={sermon} speakers={speakers} series={series} topics={topics} />
      </div>
    </div>
  )
}
