import { Suspense } from "react"
import { getPublicPrayerRequests } from "@/app/actions/prayer-actions"
import { PrayerRequestForm } from "@/components/prayer-request-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { format } from "date-fns"

async function PrayerRequestsList() {
  const { prayerRequests } = await getPublicPrayerRequests(1, 10)

  if (prayerRequests.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No public prayer requests at this time.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {prayerRequests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle className="text-lg">{request.name}</CardTitle>
            <CardDescription>Submitted on {format(new Date(request.created_at), "MMMM d, yyyy")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{request.request_text}</p>
            {request.is_answered && (
              <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
                <p className="font-medium">Praise Report: This prayer has been answered!</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function PrayerPage() {
  return (
    <div className="container py-10">
      <PageHeader
        heading="Prayer Requests"
        text="Share your prayer needs with our church family or pray for others in our community."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Submit a Request</h2>
          <PrayerRequestForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Community Prayers</h2>
          <Suspense fallback={<div>Loading prayer requests...</div>}>
            <PrayerRequestsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
