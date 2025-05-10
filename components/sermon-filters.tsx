"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getSpeakers, getSeries, getTopics } from "@/lib/sermons"

export function SermonFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [speakers, setSpeakers] = useState<{ id: string; name: string }[]>([])
  const [series, setSeries] = useState<{ id: string; title: string }[]>([])
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const currentSpeaker = searchParams?.get("speaker") || ""
  const currentSeries = searchParams?.get("series") || ""
  const currentTopic = searchParams?.get("topic") || ""
  const currentSearch = searchParams?.get("search") || ""

  useEffect(() => {
    async function loadFilters() {
      try {
        const [speakersData, seriesData, topicsData] = await Promise.all([getSpeakers(), getSeries(), getTopics()])

        setSpeakers(speakersData)
        setSeries(seriesData)
        setTopics(topicsData)
      } catch (error) {
        console.error("Error loading filters:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFilters()
  }, [])

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    }

    return newSearchParams.toString()
  }

  const handleSearch = (term: string) => {
    router.push(`${pathname}?${createQueryString({ search: term || null, page: "1" })}`)
  }

  const handleSpeakerChange = (value: string) => {
    router.push(`${pathname}?${createQueryString({ speaker: value || null, page: "1" })}`)
  }

  const handleSeriesChange = (value: string) => {
    router.push(`${pathname}?${createQueryString({ series: value || null, page: "1" })}`)
  }

  const handleTopicChange = (value: string) => {
    router.push(`${pathname}?${createQueryString({ topic: value || null, page: "1" })}`)
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const hasFilters = currentSpeaker || currentSeries || currentTopic || currentSearch

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Input
            placeholder="Search sermons..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const value = e.target.value
              const timeoutId = setTimeout(() => {
                handleSearch(value)
              }, 500)

              return () => clearTimeout(timeoutId)
            }}
            className="w-full"
          />
        </div>

        <div className="flex flex-1 gap-2">
          <Select value={currentSpeaker} onValueChange={handleSpeakerChange}>
            <SelectTrigger>
              <SelectValue placeholder="Speaker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Speakers</SelectItem>
              {speakers.map((speaker) => (
                <SelectItem key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentSeries} onValueChange={handleSeriesChange}>
            <SelectTrigger>
              <SelectValue placeholder="Series" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Series</SelectItem>
              {series.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {hasFilters ? (
            <>
              {currentSearch && (
                <Badge variant="secondary" className="gap-1">
                  Search: {currentSearch}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleSearch("")}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove search filter</span>
                  </Button>
                </Badge>
              )}

              {currentSpeaker && (
                <Badge variant="secondary" className="gap-1">
                  Speaker: {speakers.find((s) => s.id === currentSpeaker)?.name || currentSpeaker}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleSpeakerChange("")}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove speaker filter</span>
                  </Button>
                </Badge>
              )}

              {currentSeries && (
                <Badge variant="secondary" className="gap-1">
                  Series: {series.find((s) => s.id === currentSeries)?.title || currentSeries}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleSeriesChange("")}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove series filter</span>
                  </Button>
                </Badge>
              )}

              {currentTopic && (
                <Badge variant="secondary" className="gap-1">
                  Topic: {topics.find((t) => t.id === currentTopic)?.name || currentTopic}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleTopicChange("")}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove topic filter</span>
                  </Button>
                </Badge>
              )}

              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" /> Clear All
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No filters applied</div>
          )}
        </div>

        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>
    </div>
  )
}
