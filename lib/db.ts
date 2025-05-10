import { neon } from "@neondatabase/serverless"

// Create a SQL client with the pooled connection
const sql = neon(process.env.DATABASE_URL!)

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const result = await sql.query(query, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
