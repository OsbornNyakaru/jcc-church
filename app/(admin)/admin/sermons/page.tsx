import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { SermonDataTable } from "@/components/admin/sermon-data-table"
import { getSermons } from "@/lib/sermons"

export const metadata: Metadata = {
  title: "Manage Sermons",
  description: "Add, edit, and manage sermon content",
}

export default async function AdminSermonsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1
  const perPage = typeof searchParams.per_page === "string" ? Number(searchParams.per_page) : 10
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "date"
  const order = typeof searchParams.order === "string" ? searchParams.order : "desc"
  const search = typeof searchParams.search === "string" ? searchParams.search : ""

  const { sermons, totalSermons } = await getSermons({
    page,
    perPage,
    sort,
    order,
    search,
  })

  return (
    <div>
      <AdminPageHeader
        heading="Sermons"
        subheading="Manage sermon content and media"
        action={
          <Link href="/admin/sermons/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Add Sermon
            </Button>
          </Link>
        }
      />

      <SermonDataTable data={sermons} pageCount={Math.ceil(totalSermons / perPage)} />
    </div>
  )
}
