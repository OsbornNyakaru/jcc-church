import { neon } from "@neondatabase/serverless"
import { cache } from "react"

const sql = neon(process.env.DATABASE_URL!)

export interface Sermon {
  id: string
  title: string
  slug: string
  description: string
  content: string
  scripture_reference: string
  speaker: string
  date: string
  video_url: string
  audio_url: string
  image_url: string
  series: string
  tags: string[]
  download_count: number
  view_count: number
  created_at: string
  updated_at: string
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
  }: {
    page?: number
    perPage?: number
    sort?: string
    order?: "asc" | "desc"
    search?: string
    speaker?: string
    series?: string
    topic?: string
  } = {}) => {
    const offset = (page - 1) * perPage

    let query = `
    SELECT 
      id, title, slug, description, speaker, date, 
      series, video_url, audio_url, image_url, view_count
    FROM sermons
    WHERE 1=1
  `

    const params: any[] = []
    let paramIndex = 1

    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (speaker) {
      query += ` AND speaker = $${paramIndex}`
      params.push(speaker)
      paramIndex++
    }

    if (series) {
      query += ` AND series = $${paramIndex}`
      params.push(series)
      paramIndex++
    }

    if (topic && topic !== "all") {
      query += ` AND $${paramIndex} = ANY(tags)`
      params.push(topic)
      paramIndex++
    }

    // Count total matching sermons
    const countQuery = `SELECT COUNT(*) as total FROM (${query}) AS count_query`
    const countResult = await sql(countQuery, ...params)
    const totalSermons = Number.parseInt(countResult[0].total)

    // Add sorting and pagination
    query += ` ORDER BY ${sort === "date" ? "date" : sort} ${order === "asc" ? "ASC" : "DESC"}`
    query += ` LIMIT ${perPage} OFFSET ${offset}`

    const sermons = await sql(query, ...params)

    return {
      sermons,
      totalSermons,
    }
  },
)

export const getSermonBySlug = cache(async (slug: string) => {
  const query = `
    SELECT * FROM sermons
    WHERE slug = $1
    LIMIT 1
  `

  const sermons = await sql(query, slug)

  if (sermons.length === 0) {
    return null
  }

  // Update view count
  await sql(
    `
    UPDATE sermons
    SET view_count = view_count + 1
    WHERE slug = $1
  `,
    slug,
  )

  return sermons[0]
})

export const getSermonById = cache(async (id: string) => {
  const query = `
    SELECT * FROM sermons
    WHERE id = $1
    LIMIT 1
  `

  const sermons = await sql(query, id)

  if (sermons.length === 0) {
    return null
  }

  return sermons[0]
})

export const getRelatedSermons = cache(async (sermonId: string, seriesTopic?: string) => {
  let query = `
    SELECT 
      id, title, slug, description, speaker, date, 
      series, image_url
    FROM sermons
    WHERE id != $1
  `

  const params: any[] = [sermonId]

  if (seriesTopic) {
    query += ` AND series = $2`
    params.push(seriesTopic)
  }

  query += ` ORDER BY date DESC LIMIT 3`

  return await sql(query, ...params)
})

export const getLatestSermons = cache(async (limit = 3) => {
  const query = `
    SELECT 
      id, title, slug, description, speaker, date, 
      series, image_url
    FROM sermons
    ORDER BY date DESC
    LIMIT $1
  `

  return await sql(query, limit)
})

export const getSpeakers = cache(async () => {
  const query = `
    SELECT DISTINCT speaker as name, speaker as id
    FROM sermons
    ORDER BY speaker
  `

  return await sql(query)
})

export const getSeries = cache(async () => {
  const query = `
    SELECT DISTINCT series as title, series as id
    FROM sermons
    WHERE series IS NOT NULL AND series != ''
    ORDER BY series
  `

  return await sql(query)
})

export const getTopics = cache(async () => {
  const query = `
    SELECT DISTINCT unnest(tags) as name, unnest(tags) as id
    FROM sermons
    WHERE tags IS NOT NULL
    ORDER BY name
  `

  return await sql(query)
})
