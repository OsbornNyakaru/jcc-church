"use client"

import { useState } from "react"
import { CalendarIcon, Plus, Trash, Edit, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ScheduledStream {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  isRecurring: boolean
  status: "scheduled" | "completed" | "cancelled"
}

export function LiveStreamSchedule() {
  const [date, setDate] = useState<Date>(new Date())

  // Mock scheduled streams
  const scheduledStreams: ScheduledStream[] = [
    {
      id: "1",
      title: "Sunday Worship Service",
      date: new Date(2024, 4, 12, 9, 0), // May 12, 2024 at 9:00 AM
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      isRecurring: true,
      status: "scheduled",
    },
    {
      id: "2",
      title: "Midweek Bible Study",
      date: new Date(2024, 4, 15, 19, 0), // May 15, 2024 at 7:00 PM
      startTime: "7:00 PM",
      endTime: "8:30 PM",
      isRecurring: true,
      status: "scheduled",
    },
    {
      id: "3",
      title: "Youth Service",
      date: new Date(2024, 4, 17, 18, 0), // May 17, 2024 at 6:00 PM
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      isRecurring: false,
      status: "scheduled",
    },
    {
      id: "4",
      title: "Sunday Worship Service",
      date: new Date(2024, 4, 5, 9, 0), // May 5, 2024 at 9:00 AM
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      isRecurring: true,
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Scheduled Streams</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Stream
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Streams</CardTitle>
            <CardDescription>Manage your scheduled live streams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledStreams
                .filter((stream) => stream.status === "scheduled")
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((stream) => (
                  <div key={stream.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">{stream.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {format(stream.date, "EEEE, MMMM d, yyyy")} • {stream.startTime} - {stream.endTime}
                        </span>
                      </div>
                      {stream.isRecurring && (
                        <div className="mt-1">
                          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">Recurring</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}

              {scheduledStreams.filter((stream) => stream.status === "scheduled").length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">No upcoming streams scheduled</p>
                    <Button variant="link" className="mt-2">
                      Schedule a stream
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View scheduled streams by date</CardDescription>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="mt-4">
              <h3 className="font-medium">Streams on {format(date, "MMMM d, yyyy")}</h3>
              <div className="mt-2 space-y-2">
                {scheduledStreams
                  .filter(
                    (stream) =>
                      stream.date.getDate() === date.getDate() &&
                      stream.date.getMonth() === date.getMonth() &&
                      stream.date.getFullYear() === date.getFullYear(),
                  )
                  .map((stream) => (
                    <div key={stream.id} className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">{stream.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {stream.startTime} - {stream.endTime}
                      </div>
                    </div>
                  ))}

                {scheduledStreams.filter(
                  (stream) =>
                    stream.date.getDate() === date.getDate() &&
                    stream.date.getMonth() === date.getMonth() &&
                    stream.date.getFullYear() === date.getFullYear(),
                ).length === 0 && <p className="text-sm text-muted-foreground">No streams scheduled for this date</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Streams</CardTitle>
          <CardDescription>Review completed live streams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledStreams
              .filter((stream) => stream.status === "completed")
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((stream) => (
                <div key={stream.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{stream.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {format(stream.date, "EEEE, MMMM d, yyyy")} • {stream.startTime} - {stream.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View Recording
                    </Button>
                    <Button variant="outline" size="sm">
                      View Analytics
                    </Button>
                  </div>
                </div>
              ))}

            {scheduledStreams.filter((stream) => stream.status === "completed").length === 0 && (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No past streams available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
