import type { Metadata } from "next"
import { Suspense } from "react"

import { EventCalendar } from "@/components/event-calendar"
import { EventList } from "@/components/event-list"
import { EventListSkeleton } from "@/components/event-list-skeleton"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and activities at Grace Community Church.",
}

export default function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const view = typeof searchParams.view === "string" ? searchParams.view : "list"
  const month = typeof searchParams.month === "string" ? searchParams.month : undefined
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined

  return (
    <div className="container py-8">
      <PageHeader heading="Events Calendar" subheading="Join us for upcoming events and activities" />

      <Tabs defaultValue={view === "calendar" ? "calendar" : "list"} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <Suspense fallback={<EventListSkeleton />}>
            <EventList category={category} />
          </Suspense>
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
          <EventCalendar month={month} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
