"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)
    setEmail("")

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-primary-foreground">Stay Connected</h2>
      <p className="mt-2 text-primary-foreground/80">
        Subscribe to our newsletter to receive updates on events, sermons, and church news.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email address"
            className="pl-10 text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="bg-background text-primary hover:bg-background/90">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {isSuccess && (
        <p className="mt-4 text-sm text-primary-foreground">
          Thank you for subscribing! You will receive our next newsletter.
        </p>
      )}
    </div>
  )
}
