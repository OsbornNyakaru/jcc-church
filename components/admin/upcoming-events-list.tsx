"use client"

import { formatDistanceToNow } from "date-fns"
import { Calendar, Users, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    location: "Main Sanctuary",
    attendees: 0,
    category: "Worship",
  },
  {
    id: "2",
    title: "Youth Group Meeting",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
    location: "Youth Center",
    attendees: 15,
    category: "Youth",
  },
  {
    id: "3",
    title: "Community Outreach Day",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    location: "Church Parking Lot",
    attendees: 25,
    category: "Outreach",
  },
  {
    id: "4",
    title: "Women's Bible Study",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9), // 9 days from now
    location: "Fellowship Hall",
    attendees: 12,
    category: "Bible Study",
  },
  {
    id: "5",
    title: "Men's Breakfast",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12), // 12 days from now
    location: "Fellowship Hall",
    attendees: 8,
    category: "Fellowship",
  },
]

export function UpcomingEventsList() {
  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <div key={event.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{event.title}</h3>
            <Badge variant="outline">{event.category}</Badge>
          </div>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(event.date, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.attendees} registered attendees</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
