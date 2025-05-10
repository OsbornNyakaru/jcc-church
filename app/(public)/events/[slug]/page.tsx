import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { EventRegistrationForm } from "@/components/event-registration-form"
import { getEventBySlug } from "@/app/actions/event-actions"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    }
  }

  return {
    title: event.title,
    description: event.description,
  }
}

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  const startDate = new Date(event.start_date)
  const endDate = event.end_date ? new Date(event.end_date) : null

  return (
    <div className="container py-8">
      <Link href="/events" className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Events
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
            <Image
              src={event.image_url || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-bold">{event.title}</h1>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Date</div>
                <div className="text-sm text-muted-foreground">
                  {startDate.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {endDate && endDate.toDateString() !== startDate.toDateString() && (
                    <>
                      {" "}
                      -{" "}
                      {endDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Time</div>
                <div className="text-sm text-muted-foreground">
                  {startDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  {endDate && <> - {endDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</>}
                </div>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{event.location}</div>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="prose max-w-none dark:prose-invert">
            <h2>About This Event</h2>
            <p>{event.description}</p>
            {event.content && <div dangerouslySetInnerHTML={{ __html: event.content }} />}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Event Registration</CardTitle>
            </CardHeader>
            <CardContent>
              {event.registration_required ? (
                <>
                  {event.max_attendees && (
                    <div className="mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Limited to {event.max_attendees} attendees</span>
                    </div>
                  )}
                  <Suspense fallback={<div>Loading registration form...</div>}>
                    <EventRegistrationForm eventId={event.id} eventTitle={event.title}/>
                  </Suspense>
                </>
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">No registration required for this event. Just show up!</p>
                  <Button asChild>
                    <Link href="/events">Browse More Events</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
