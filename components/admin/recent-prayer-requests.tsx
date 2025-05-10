"use client"

import { formatDistanceToNow } from "date-fns"
import { Lock, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for recent prayer requests
const recentPrayerRequests = [
  {
    id: "1",
    name: "John Smith",
    requestText: "Please pray for my mother who is recovering from surgery.",
    isPrivate: false,
    isAnswered: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "2",
    name: "Sarah Johnson",
    requestText: "I have a job interview next week. Prayers for guidance and favor would be appreciated.",
    isPrivate: false,
    isAnswered: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "3",
    name: "Michael Williams",
    requestText: "Praying for wisdom as we make decisions about our children's education.",
    isPrivate: false,
    isAnswered: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
  {
    id: "4",
    name: "Emily Davis",
    requestText: "My grandfather is in the hospital. Please pray for healing and comfort.",
    isPrivate: true,
    isAnswered: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: "5",
    name: "Lisa Anderson",
    requestText: "Please pray for my upcoming mission trip to Guatemala.",
    isPrivate: false,
    isAnswered: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

export function RecentPrayerRequests() {
  return (
    <div className="space-y-4">
      {recentPrayerRequests.map((request) => (
        <div key={request.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{request.name}</h3>
              {request.isPrivate && (
                <Badge variant="outline" className="flex items-center gap-1 px-1 py-0 text-xs">
                  <Lock className="h-3 w-3" /> Private
                </Badge>
              )}
              {request.isAnswered && (
                <Badge variant="outline" className="flex items-center gap-1 px-1 py-0 text-xs text-green-600">
                  <Check className="h-3 w-3" /> Answered
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(request.date, { addSuffix: true })}
            </span>
          </div>
          <p className="mt-2 text-sm">{request.requestText}</p>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Respond
            </Button>
            {!request.isAnswered && (
              <Button variant="outline" size="sm" className="text-green-600">
                Mark as Answered
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
