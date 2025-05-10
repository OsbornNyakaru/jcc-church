// This is a mock implementation for demonstration purposes
// In a real application, this would connect to your database

import { cache } from "react"

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  startDate: string
  endDate?: string
  time: string
  location?: string
  imageUrl?: string
  category?: string
  isRecurring: boolean
  registrationRequired: boolean
  registrationUrl?: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Worship Service",
    slug: "sunday-worship-service",
    description: "Join us for our weekly worship service with music, prayer, and teaching.",
    startDate: "2023-05-14T09:00:00Z",
    time: "9:00 AM & 11:00 AM",
    location: "Main Sanctuary",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Worship",
    isRecurring: true,
    registrationRequired: false,
  },
  {
    id: "2",
    title: "Youth Group Meeting",
    slug: "youth-group-meeting",
    description: "Weekly gathering for teens with games, worship, and Bible study.",
    startDate: "2023-05-17T18:00:00Z",
    time: "6:00 PM - 8:00 PM",
    location: "Youth Center",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Youth",
    isRecurring: true,
    registrationRequired: false,
  },
  {
    id: "3",
    title: "Community Outreach Day",
    slug: "community-outreach-day",
    description: "Join us as we serve our local community through various service projects.",
    content: "<p>Full event details would go here...</p>",
    startDate: "2023-05-20T09:00:00Z",
    time: "9:00 AM - 2:00 PM",
    location: "Meet at Church Parking Lot",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Outreach",
    isRecurring: false,
    registrationRequired: true,
    registrationUrl: "/events/community-outreach-day/register",
  },
]

export const getUpcomingEvents = cache(async (limit = 3) => {
  const now = new Date()

  return mockEvents
    .filter((event) => new Date(event.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit)
})

export const getEventBySlug = cache(async (slug: string) => {
  return mockEvents.find((event) => event.slug === slug) || null
})

export const getEventCategories = cache(async () => {
  const categories = new Set<string>()

  mockEvents.forEach((event) => {
    if (event.category) {
      categories.add(event.category)
    }
  })

  return Array.from(categories)
})
