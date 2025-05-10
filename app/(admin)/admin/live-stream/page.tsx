import type { Metadata } from "next"
import { Suspense } from "react"
import { Play, Pause, Settings, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { LiveStreamControls } from "@/components/admin/live-stream-controls"
import { LiveStreamSettings } from "@/components/admin/live-stream-settings"
import { LiveStreamAnalytics } from "@/components/admin/live-stream-analytics"
import { LiveStreamSchedule } from "@/components/admin/live-stream-schedule"
import { LiveStreamPreview } from "@/components/admin/live-stream-preview"
import { LiveStreamStatus } from "@/components/admin/live-stream-status"
import { getLiveStreamStatus } from "@/lib/live-stream"

export const metadata: Metadata = {
  title: "Live Stream Management",
  description: "Manage church live streaming",
}

export default async function AdminLiveStreamPage() {
  const { isLive, streamId } = await getLiveStreamStatus()

  return (
    <div>
      <AdminPageHeader
        heading="Live Stream Management"
        subheading="Control and monitor your church's live stream"
        action={
          <Button variant={isLive ? "destructive" : "default"} className="gap-2">
            {isLive ? (
              <>
                <Pause className="h-4 w-4" /> End Stream
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start Stream
              </>
            )}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle>Stream Preview</CardTitle>
            <CardDescription>
              {isLive
                ? "Your stream is currently live and visible to viewers"
                : "Preview your stream before going live"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="aspect-video animate-pulse bg-muted rounded-md" />}>
              <LiveStreamPreview streamId={streamId} />
            </Suspense>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <LiveStreamStatus isLive={isLive} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2" variant="outline">
                <RefreshCw className="h-4 w-4" /> Refresh Stream Key
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Settings className="h-4 w-4" /> Configure Encoder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="controls" className="mt-6">
        <TabsList>
          <TabsTrigger value="controls">Stream Controls</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="controls" className="mt-4 space-y-4">
          <LiveStreamControls isLive={isLive} />
        </TabsContent>
        <TabsContent value="settings" className="mt-4 space-y-4">
          <LiveStreamSettings />
        </TabsContent>
        <TabsContent value="analytics" className="mt-4 space-y-4">
          <LiveStreamAnalytics />
        </TabsContent>
        <TabsContent value="schedule" className="mt-4 space-y-4">
          <LiveStreamSchedule />
        </TabsContent>
      </Tabs>
    </div>
  )
}
