import { getPublicPrayerRequests } from "@/app/actions/prayer-actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

export async function PrayerRequestList() {
  const { prayerRequests } = await getPublicPrayerRequests()

  if (prayerRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No public prayer requests at this time.</p>
        <p className="mt-2 text-muted-foreground">Be the first to share a request with our community.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {prayerRequests.map((request) => (
        <Card key={request.id}>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium">{request.name}</div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
              </div>
            </div>
            <p className="text-sm">{request.request_text}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              I Prayed For This
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
