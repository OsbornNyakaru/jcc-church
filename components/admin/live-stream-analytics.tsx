"use client"

import { useState } from "react"
import { Calendar, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function LiveStreamAnalytics() {
  const [date, setDate] = useState<Date>(new Date())
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {timeRange === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,486</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peak Concurrent Viewers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+5% from last stream</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Watch Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28:14</div>
            <p className="text-xs text-muted-foreground">+3:42 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last stream</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="viewers">
        <TabsList>
          <TabsTrigger value="viewers">Viewers</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quality">Stream Quality</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="viewers" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Viewer Trends</CardTitle>
              <CardDescription>Viewership over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground">Viewer trend chart would appear here</div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Viewer Retention</CardTitle>
                <CardDescription>How long viewers stayed watching</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Retention chart would appear here</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where viewers came from</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Traffic sources chart would appear here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Chat activity, reactions, and interactions</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground">Engagement chart would appear here</div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Chat Users</CardTitle>
                <CardDescription>Most active participants</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Grace Member</span>
                    <span className="text-muted-foreground">42 messages</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>John D.</span>
                    <span className="text-muted-foreground">38 messages</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Sarah W.</span>
                    <span className="text-muted-foreground">27 messages</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Michael T.</span>
                    <span className="text-muted-foreground">24 messages</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Rebecca J.</span>
                    <span className="text-muted-foreground">19 messages</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Peaks</CardTitle>
                <CardDescription>Moments with highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>00:18:24</span>
                    <span className="text-muted-foreground">Sermon introduction</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>00:32:15</span>
                    <span className="text-muted-foreground">Key scripture reading</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>00:45:30</span>
                    <span className="text-muted-foreground">Personal testimony</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>01:02:18</span>
                    <span className="text-muted-foreground">Call to action</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>01:15:42</span>
                    <span className="text-muted-foreground">Closing prayer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stream Health</CardTitle>
              <CardDescription>Technical performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground">Stream health chart would appear here</div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Bitrate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8 Mbps</div>
                <p className="text-xs text-muted-foreground">Excellent quality</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Dropped Frames</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.3%</div>
                <p className="text-xs text-muted-foreground">Well below threshold</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Buffering Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2%</div>
                <p className="text-xs text-muted-foreground">Good viewer experience</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Viewer Locations</CardTitle>
                <CardDescription>Geographic distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-muted-foreground">Location map would appear here</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>How viewers are watching</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-muted-foreground">Device chart would appear here</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Viewer Demographics</CardTitle>
              <CardDescription>Age groups and other demographics</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-muted-foreground">Demographics chart would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
