import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getAllEvents } from "@/app/actions/event-actions"

interface EventListProps {
  category?: string
}

export async function EventList({ category }: EventListProps) {
  const { events } = await getAllEvents(1, 10, category)

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No events found</h3>
        <p className="mt-2 text-muted-foreground">
          {category ? `There are no events in the ${category} category.` : "There are no upcoming events at this time."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={event.image_url || "/placeholder.svg?height=200&width=400"}
              alt={event.title}
              fill
              className="object-cover"
            />
            {event.category && <Badge className="absolute right-2 top-2">{event.category}</Badge>}
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={event.start_date}>{new Date(event.start_date).toLocaleDateString()}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
            <p className="mt-3 line-clamp-2 text-sm">{event.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/events/${event.slug}`} className="w-full">
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
