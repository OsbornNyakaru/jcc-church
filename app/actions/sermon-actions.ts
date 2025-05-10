"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const sermonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  scripture_reference: z.string().optional(),
  speaker: z.string().min(1, "Speaker is required"),
  date: z.string().min(1, "Date is required"),
  video_url: z.string().optional(),
  audio_url: z.string().optional(),
  image_url: z.string().optional(),
  series: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function createSermon(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries())

  // Handle tags which might be a comma-separated string
  if (typeof rawData.tags === "string") {
    rawData.tags = rawData.tags.split(",").map((tag) => tag.trim())
  } else {
    rawData.tags = []
  }

  try {
    const data = sermonSchema.parse(rawData)

    const query = `
      INSERT INTO sermons (
        title, slug, description, content, scripture_reference,
        speaker, date, video_url, audio_url, image_url,
        series, tags
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      ) RETURNING id
    `

    const result = await sql(
      query,
      data.title,
      data.slug,
      data.description,
      data.content || "",
      data.scripture_reference || "",
      data.speaker,
      data.date,
      data.video_url || "",
      data.audio_url || "",
      data.image_url || "",
      data.series || "",
      data.tags || [],
    )

    revalidatePath("/media/sermons")
    revalidatePath("/admin/sermons")

    return { success: true, id: result[0].id }
  } catch (error) {
    console.error("Error creating sermon:", error)
    return { success: false, error: "Failed to create sermon" }
  }
}

export async function updateSermon(id: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries())

  // Handle tags which might be a comma-separated string
  if (typeof rawData.tags === "string") {
    rawData.tags = rawData.tags.split(",").map((tag) => tag.trim())
  } else {
    rawData.tags = []
  }

  try {
    const data = sermonSchema.parse(rawData)

    const query = `
      UPDATE sermons SET
        title = $1,
        slug = $2,
        description = $3,
        content = $4,
        scripture_reference = $5,
        speaker = $6,
        date = $7,
        video_url = $8,
        audio_url = $9,
        image_url = $10,
        series = $11,
        tags = $12,
        updated_at = NOW()
      WHERE id = $13
    `

    await sql(
      query,
      data.title,
      data.slug,
      data.description,
      data.content || "",
      data.scripture_reference || "",
      data.speaker,
      data.date,
      data.video_url || "",
      data.audio_url || "",
      data.image_url || "",
      data.series || "",
      data.tags || [],
      id,
    )

    revalidatePath("/media/sermons")
    revalidatePath(`/media/sermons/${data.slug}`)
    revalidatePath("/admin/sermons")

    return { success: true }
  } catch (error) {
    console.error("Error updating sermon:", error)
    return { success: false, error: "Failed to update sermon" }
  }
}

export async function deleteSermon(id: string) {
  try {
    await sql("DELETE FROM sermons WHERE id = $1", id)

    revalidatePath("/media/sermons")
    revalidatePath("/admin/sermons")

    return { success: true }
  } catch (error) {
    console.error("Error deleting sermon:", error)
    return { success: false, error: "Failed to delete sermon" }
  }
}

export async function incrementSermonDownloads(id: string) {
  try {
    await sql(
      `
      UPDATE sermons
      SET download_count = download_count + 1
      WHERE id = $1
    `,
      id,
    )

    return { success: true }
  } catch (error) {
    console.error("Error incrementing download count:", error)
    return { success: false }
  }
}
