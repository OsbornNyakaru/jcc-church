"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"

interface EventRegistrationData {
  eventId: number
  userId?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  numGuests: number
  comments?: string
}

export async function registerForEvent(data: EventRegistrationData) {
  try {
    // Check if event exists and has registration enabled
    const event = await executeQuery("SELECT * FROM events WHERE id = $1 AND registration_required = true", [
      data.eventId,
    ])

    if (!event || event.length === 0) {
      throw new Error("Event not found or registration not required")
    }

    // Check if already registered
    const existingRegistration = await executeQuery(
      "SELECT * FROM event_registrations WHERE event_id = $1 AND email = $2",
      [data.eventId, data.email],
    )

    if (existingRegistration && existingRegistration.length > 0) {
      throw new Error("You are already registered for this event")
    }

    // Check if event is at capacity
    if (event[0].max_attendees) {
      const registrations = await executeQuery(
        `SELECT SUM(num_guests + 1) as total_attendees 
         FROM event_registrations 
         WHERE event_id = $1`,
        [data.eventId],
      )

      const totalAttendees = Number.parseInt(registrations[0]?.total_attendees || "0", 10)
      const newTotal = totalAttendees + data.numGuests + 1

      if (newTotal > event[0].max_attendees) {
        throw new Error("This event is at capacity")
      }
    }

    // Register for the event
    await executeQuery(
      `INSERT INTO event_registrations 
        (event_id, user_id, first_name, last_name, email, phone, num_guests, comments) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        data.eventId,
        data.userId || null,
        data.firstName,
        data.lastName,
        data.email,
        data.phone || null,
        data.numGuests,
        data.comments || null,
      ],
    )

    revalidatePath(`/events/${event[0].slug}`)
    revalidatePath("/admin/events")

    return { success: true }
  } catch (error) {
    console.error("Error registering for event:", error)
    throw error
  }
}

export async function getEventRegistrationStatus(eventId: number, email: string) {
  try {
    const registration = await executeQuery("SELECT * FROM event_registrations WHERE event_id = $1 AND email = $2", [
      eventId,
      email,
    ])

    return { isRegistered: registration && registration.length > 0 }
  } catch (error) {
    console.error("Error checking registration status:", error)
    throw error
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const event = await executeQuery("SELECT * FROM events WHERE slug = $1", [slug])

    return event && event.length > 0 ? event[0] : null
  } catch (error) {
    console.error("Error fetching event:", error)
    throw error
  }
}

export async function getUpcomingEvents(limit = 3) {
  try {
    const events = await executeQuery(
      `SELECT * FROM events 
       WHERE start_date >= NOW() 
       ORDER BY start_date ASC 
       LIMIT $1`,
      [limit],
    )

    return events
  } catch (error) {
    console.error("Error fetching upcoming events:", error)
    throw error
  }
}

export async function getAllEvents(page = 1, limit = 10, category?: string) {
  const offset = (page - 1) * limit

  try {
    let query = `SELECT * FROM events ORDER BY start_date DESC LIMIT $1 OFFSET $2`
    const params = [limit, offset]

    if (category) {
      query = `SELECT * FROM events WHERE category = $3 ORDER BY start_date DESC LIMIT $1 OFFSET $2`
      params.push(category)
    }

    const events = await executeQuery(query, params)

    let countQuery = "SELECT COUNT(*) FROM events"
    const countParams: any[] = []

    if (category) {
      countQuery = "SELECT COUNT(*) FROM events WHERE category = $1"
      countParams.push(category)
    }

    const totalCount = await executeQuery(countQuery, countParams)

    return {
      events,
      totalCount: Number.parseInt(totalCount[0].count, 10),
      totalPages: Math.ceil(Number.parseInt(totalCount[0].count, 10) / limit),
    }
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

export async function getEventRegistrations(eventId: number) {
  try {
    const registrations = await executeQuery(
      "SELECT * FROM event_registrations WHERE event_id = $1 ORDER BY created_at DESC",
      [eventId],
    )

    return registrations
  } catch (error) {
    console.error("Error fetching event registrations:", error)
    throw error
  }
}
