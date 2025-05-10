"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"

interface PrayerRequestData {
  userId?: string
  name: string
  email: string
  requestText: string
  isPrivate: boolean
}

export async function submitPrayerRequest(data: PrayerRequestData) {
  try {
    await executeQuery(
      `INSERT INTO prayer_requests 
        (user_id, name, email, request_text, is_private) 
       VALUES 
        ($1, $2, $3, $4, $5)`,
      [data.userId || null, data.name, data.email, data.requestText, data.isPrivate],
    )

    revalidatePath("/connect/prayer")
    revalidatePath("/admin/prayer-requests")

    return { success: true }
  } catch (error) {
    console.error("Error submitting prayer request:", error)
    throw error
  }
}

export async function getPublicPrayerRequests(page = 1, limit = 10) {
  const offset = (page - 1) * limit

  try {
    const prayerRequests = await executeQuery(
      `SELECT * FROM prayer_requests 
       WHERE is_private = false AND is_approved = true 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    )

    const totalCount = await executeQuery(
      "SELECT COUNT(*) FROM prayer_requests WHERE is_private = false AND is_approved = true",
      [],
    )

    return {
      prayerRequests,
      totalCount: Number.parseInt(totalCount[0].count, 10),
      totalPages: Math.ceil(Number.parseInt(totalCount[0].count, 10) / limit),
    }
  } catch (error) {
    console.error("Error fetching prayer requests:", error)
    throw error
  }
}

export async function getAllPrayerRequests(page = 1, limit = 10) {
  const offset = (page - 1) * limit

  try {
    const prayerRequests = await executeQuery(
      `SELECT * FROM prayer_requests 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    )

    const totalCount = await executeQuery("SELECT COUNT(*) FROM prayer_requests", [])

    return {
      prayerRequests,
      totalCount: Number.parseInt(totalCount[0].count, 10),
      totalPages: Math.ceil(Number.parseInt(totalCount[0].count, 10) / limit),
    }
  } catch (error) {
    console.error("Error fetching prayer requests:", error)
    throw error
  }
}

export async function approvePrayerRequest(id: number) {
  try {
    await executeQuery("UPDATE prayer_requests SET is_approved = true WHERE id = $1", [id])

    revalidatePath("/connect/prayer")
    revalidatePath("/admin/prayer-requests")

    return { success: true }
  } catch (error) {
    console.error("Error approving prayer request:", error)
    throw error
  }
}

export async function markPrayerRequestAsAnswered(id: number) {
  try {
    await executeQuery("UPDATE prayer_requests SET is_answered = true WHERE id = $1", [id])

    revalidatePath("/connect/prayer")
    revalidatePath("/admin/prayer-requests")

    return { success: true }
  } catch (error) {
    console.error("Error marking prayer request as answered:", error)
    throw error
  }
}
