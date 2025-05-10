"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

interface MemberData {
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  birthDate?: Date
  bio?: string
}

export async function registerMember(data: MemberData) {
  const { userId } = auth()

  if (!userId || userId !== data.userId) {
    throw new Error("Unauthorized")
  }

  try {
    // Check if member already exists
    const existingMember = await executeQuery("SELECT id FROM members WHERE user_id = $1 OR email = $2", [
      data.userId,
      data.email,
    ])

    if (existingMember && existingMember.length > 0) {
      throw new Error("Member already exists")
    }

    // Insert new member
    await executeQuery(
      `INSERT INTO members 
        (user_id, first_name, last_name, email, phone, address, city, state, zip, birth_date, bio) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        data.userId,
        data.firstName,
        data.lastName,
        data.email,
        data.phone || null,
        data.address || null,
        data.city || null,
        data.state || null,
        data.zip || null,
        data.birthDate || null,
        data.bio || null,
      ],
    )

    revalidatePath("/connect/register")
    revalidatePath("/admin/members")

    return { success: true }
  } catch (error) {
    console.error("Error registering member:", error)
    throw error
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    const member = await executeQuery("SELECT * FROM members WHERE user_id = $1", [userId])

    return member && member.length > 0 ? member[0] : null
  } catch (error) {
    console.error("Error fetching member:", error)
    throw error
  }
}

export async function getAllMembers(page = 1, limit = 10) {
  const offset = (page - 1) * limit

  try {
    const members = await executeQuery(`SELECT * FROM members ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [
      limit,
      offset,
    ])

    const totalCount = await executeQuery("SELECT COUNT(*) FROM members", [])

    return {
      members,
      totalCount: Number.parseInt(totalCount[0].count, 10),
      totalPages: Math.ceil(Number.parseInt(totalCount[0].count, 10) / limit),
    }
  } catch (error) {
    console.error("Error fetching members:", error)
    throw error
  }
}
