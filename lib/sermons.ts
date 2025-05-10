// This is a mock implementation for demonstration purposes
// In a real application, this would connect to your database

import { cache } from "react"

export interface Sermon {
  id: string
  title: string
  slug: string
  description: string
  content: string
  date: string
  speaker: string
  speakerId: string
  seriesTitle?: string
  seriesId?: string
  videoId?: string
  audioUrl?: string
  thumbnailUrl?: string
  duration?: string
  status: "published" | "draft"
  views: number
  topics?: string[]
}

const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "Finding Peace in Troubled Times",
    slug: "finding-peace-in-troubled-times",
    description: "How to find God's peace when life gets difficult.",
    content: "<p>Full sermon content would go here...</p>",
    date: "2023-04-16T10:00:00Z",
    speaker: "Pastor John Smith",
    speakerId: "1",
    seriesTitle: "Peace That Passes Understanding",
    seriesId: "1",
    videoId: "abc123",
    audioUrl: "https://example.com/sermons/finding-peace.mp3",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "38:45",
    status: "published",
    views: 1245,
    topics: ["peace", "faith", "trust"],
  },
  {
    id: "2",
    title: "The Power of Prayer",
    slug: "the-power-of-prayer",
    description: "Discovering how prayer can transform your life and circumstances.",
    content: "<p>Full sermon content would go here...</p>",
    date: "2023-04-09T10:00:00Z",
    speaker: "Pastor John Smith",
    speakerId: "1",
    seriesTitle: "Prayer Warriors",
    seriesId: "2",
    videoId: "def456",
    audioUrl: "https://example.com/sermons/power-of-prayer.mp3",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "42:18",
    status: "published",
    views: 987,
    topics: ["prayer", "spiritual disciplines"],
  },
  {
    id: "3",
    title: "Living with Purpose",
    slug: "living-with-purpose",
    description: "Understanding God's purpose for your life and how to live it out.",
    content: "<p>Full sermon content would go here...</p>",
    date: "2023-04-02T10:00:00Z",
    speaker: "Pastor Sarah Johnson",
    speakerId: "2",
    videoId: "ghi789",
    audioUrl: "https://example.com/sermons/living-with-purpose.mp3",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "45:30",
    status: "published",
    views: 756,
    topics: ["purpose", "calling", "mission"],
  },
]

interface GetSermonsOptions {
  page?: number
  perPage?: number
  sort?: string
  order?: "asc" | "desc"
  search?: string
  speaker?: string
  series?: string
  topic?: string
}

export const getSermons = cache(
  async ({
    page = 1,
    perPage = 10,
    sort = "date",
    order = "desc",
    search = "",
    speaker = "",
    series = "",
    topic = "",
  }: GetSermonsOptions = {}) => {
    // In a real app, this would be a database query
    let filteredSermons = [...mockSermons]

    // Apply filters
    if (search) {
      filteredSermons = filteredSermons.filter(
        (sermon) =>
          sermon.title.toLowerCase().includes(search.toLowerCase()) ||
          sermon.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (speaker) {
      filteredSermons = filteredSermons.filter((sermon) => sermon.speakerId === speaker)
    }

    if (series) {
      filteredSermons = filteredSermons.filter((sermon) => sermon.seriesId === series)
    }

    if (topic) {
      filteredSermons = filteredSermons.filter((sermon) => sermon.topics?.includes(topic))
    }

    // Sort
    filteredSermons.sort((a, b) => {
      if (sort === "date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      if (sort === "title") {
        return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }

      if (sort === "views") {
        return order === "asc" ? a.views - b.views : b.views - a.views
      }

      return 0
    })

    // Paginate
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedSermons = filteredSermons.slice(start, end)

    return {
      sermons: paginatedSermons,
      totalSermons: filteredSermons.length,
    }
  },
)

export const getSermonBySlug = cache(async (slug: string) => {
  return mockSermons.find((sermon) => sermon.slug === slug) || null
})

export const getSermonById = cache(async (id: string) => {
  return mockSermons.find((sermon) => sermon.id === id) || null
})

export const getRelatedSermons = cache(async (sermonId: string, seriesId?: string) => {
  if (seriesId) {
    return mockSermons.filter((sermon) => sermon.id !== sermonId && sermon.seriesId === seriesId).slice(0, 3)
  }

  return mockSermons.filter((sermon) => sermon.id !== sermonId).slice(0, 3)
})

export const getLatestSermons = cache(async (limit = 3) => {
  return mockSermons
    .filter((sermon) => sermon.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
})

export const getSpeakers = cache(async () => {
  return [
    { id: "1", name: "Pastor John Smith" },
    { id: "2", name: "Pastor Sarah Johnson" },
    { id: "3", name: "Pastor Michael Williams" },
  ]
})

export const getSeries = cache(async () => {
  return [
    { id: "1", title: "Peace That Passes Understanding" },
    { id: "2", title: "Prayer Warriors" },
    { id: "3", title: "Faith Foundations" },
  ]
})

export const getTopics = cache(async () => {
  return [
    { id: "peace", name: "Peace" },
    { id: "faith", name: "Faith" },
    { id: "prayer", name: "Prayer" },
    { id: "purpose", name: "Purpose" },
    { id: "calling", name: "Calling" },
  ]
})
