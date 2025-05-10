"use client"

import { formatDistanceToNow } from "date-fns"
import { Heart } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for recent donations
const recentDonations = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    amount: 100,
    fund: "General",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    amount: 250,
    fund: "Missions",
    date: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Williams",
    email: "michael.williams@example.com",
    amount: 50,
    fund: "Building",
    date: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    amount: 75,
    fund: "Youth",
    date: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Anonymous",
    email: "anonymous@example.com",
    amount: 500,
    fund: "General",
    date: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    imageUrl: null,
  },
]

export function RecentDonations() {
  return (
    <div className="space-y-4">
      {recentDonations.map((donation) => (
        <div key={donation.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            {donation.imageUrl ? (
              <AvatarImage src={donation.imageUrl || "/placeholder.svg"} alt={donation.name} />
            ) : null}
            <AvatarFallback>
              {donation.name === "Anonymous"
                ? "AN"
                : donation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{donation.name}</p>
              <p className="text-sm font-medium">${donation.amount.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <Badge variant="outline" className="px-1 py-0 text-xs">
                  {donation.fund}
                </Badge>
              </div>
              <span>{formatDistanceToNow(donation.date, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
