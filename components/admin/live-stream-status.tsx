import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LiveStreamStatusProps {
  isLive: boolean
}

export function LiveStreamStatus({ isLive }: LiveStreamStatusProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Stream Status</CardTitle>
        <CardDescription>Current status of your live stream</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          {isLive ? (
            <>
              <Badge variant="default" className="bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                LIVE
              </Badge>
              <p className="text-sm">Your stream is currently live</p>
              <div className="text-xs text-muted-foreground">Started streaming 1 hour 24 minutes ago</div>
              <div className="mt-2 text-sm">
                <span className="font-medium">342</span> current viewers
              </div>
            </>
          ) : (
            <>
              <Badge variant="outline" className="px-3 py-1">
                OFFLINE
              </Badge>
              <p className="text-sm">Your stream is currently offline</p>
              <div className="text-xs text-muted-foreground">Last stream ended 3 days ago</div>
              <div className="mt-2 text-sm">Next scheduled stream: Sunday, 9:00 AM</div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
