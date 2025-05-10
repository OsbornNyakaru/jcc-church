// This is a mock implementation for demonstration purposes
// In a real application, this would connect to your database

import { cache } from "react"

type UserRole = "admin" | "editor" | "volunteer" | "member"

interface UserPermission {
  userId: string
  roles: UserRole[]
}

// Mock user permissions
const userPermissions: UserPermission[] = [
  {
    userId: "user_2NNKXpPQYGQzyaFdQlHEBTk8vXr",
    roles: ["admin"],
  },
  {
    userId: "user_2M7H7sLQWjhRJw0GQRx4Sb3NqZl",
    roles: ["editor"],
  },
  {
    userId: "user_2L5HjkLQWjhRJw0GQRx4Sb3MpYk",
    roles: ["volunteer", "member"],
  },
]

export const checkUserPermissions = cache(async (userId: string, requiredRoles: UserRole[]): Promise<boolean> => {
  const userPermission = userPermissions.find((p) => p.userId === userId)

  if (!userPermission) {
    return false
  }

  return requiredRoles.some((role) => userPermission.roles.includes(role))
})

export const getUserRoles = cache(async (userId: string): Promise<UserRole[]> => {
  const userPermission = userPermissions.find((p) => p.userId === userId)

  if (!userPermission) {
    return []
  }

  return userPermission.roles
})
