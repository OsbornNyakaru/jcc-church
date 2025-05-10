import type { Metadata } from "next"
import { Suspense } from "react"
import { Calendar, Clock, AlertCircle } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { LiveStreamPlayer } from "@/components/live-stream-player"
import { LiveChat } from "@/components/live-chat"
import { UpcomingServiceInfo } from "@/components/upcoming-service-info"
import { LiveStreamSkeleton } from "@/components/live-stream-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLiveStreamStatus } from "@/lib/live-stream"

export const metadata: Metadata = {
  title: "Live Stream",
  description: "Join our worship services live online every Sunday.",
}

export default async function LiveStreamPage() {
  const { isLive, nextServiceTime, streamId } = await getLiveStreamStatus()

  return (
    <div className="container py-8">
      <PageHeader
        heading="Live Stream"
        subheading="Join our worship services live online every Sunday at 9:00 AM and 11:00 AM"
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<LiveStreamSkeleton />}>
            {isLive ? (
              <LiveStreamPlayer streamId={streamId} />
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-bold">We're Currently Offline</h2>
                    <p className="mt-2 text-muted-foreground">
                      Our next live service will begin soon. Please check back at the scheduled time.
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-lg font-medium">
                      <Calendar className="h-5 w-5" />
                      <span>Next Service:</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <time dateTime={nextServiceTime}>
                        {new Date(nextServiceTime).toLocaleString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Service Reminder</AlertTitle>
                  <AlertDescription>You can set a reminder to be notified when we go live.</AlertDescription>
                </Alert>
              </div>
            )}
          </Suspense>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">About Today's Service</h2>
            <div className="mt-4 prose max-w-none dark:prose-invert">
              <p>
                Welcome to our live stream! We're glad you've joined us today for worship, prayer, and teaching from
                God's Word.
              </p>
              <p>
                If you're new to Grace Community Church, we'd love to connect with you. Please fill out our digital
                connect card, and someone from our team will reach out to you.
              </p>
              <p>
                During the service, you can participate in worship, follow along with scripture readings, and engage
                with the message. The live chat is available for prayer requests, questions, and connecting with others.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="chat">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
              <TabsTrigger value="info">Service Info</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <LiveChat isLive={isLive} />
            </TabsContent>
            <TabsContent value="info" className="mt-4">
              <UpcomingServiceInfo />
            </TabsContent>
          </Tabs>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Ways to Give</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your generosity enables our ministry to continue reaching people with the love of Christ.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="/give"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Give Online
              </a>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Need Prayer?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our prayer team is available to pray with you during and after the service.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="/connect/prayer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Submit Prayer Request
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
