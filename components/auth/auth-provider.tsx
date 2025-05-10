"use client"

import type { ReactNode } from "react"

// Mock ClerkProvider for development
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function useAuth() {
  // Mock authentication hook
  return {
    isSignedIn: true,
    userId: "user_2NNKXpPQYGQzyaFdQlHEBTk8vXr",
    user: {
      id: "user_2NNKXpPQYGQzyaFdQlHEBTk8vXr",
      firstName: "John",
      lastName: "Smith",
      emailAddresses: [{ emailAddress: "john.smith@example.com" }],
    },
  }
}

export function SignedIn({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function SignedOut({ children }: { children: ReactNode }) {
  return null
}

export function SignInButton({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function SignUpButton({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function UserButton() {
  return <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">JS</div>
}
