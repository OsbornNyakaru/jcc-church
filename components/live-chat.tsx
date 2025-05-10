"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  id: string
  userId: string
  userName: string
  userImage?: string
  content: string
  timestamp: Date
}

interface LiveChatProps {
  isLive: boolean
}

export function LiveChat({ isLive }: LiveChatProps) {
  const { user, isLoaded } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Simulate loading messages
  useEffect(() => {
    if (isLive) {
      // Simulate connection delay
      const timer = setTimeout(() => {
        setIsConnected(true)

        // Simulate initial messages
        setMessages([
          {
            id: "1",
            userId: "user1",
            userName: "Grace Member",
            content: "Good morning everyone! Excited for today's service.",
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          },
          {
            id: "2",
            userId: "user2",
            userName: "John D.",
            userImage: "/placeholder.svg?height=40&width=40",
            content: "The worship team sounds amazing today!",
            timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
          },
          {
            id: "3",
            userId: "user3",
            userName: "Pastor Mike",
            content: "Welcome everyone joining us online today. We're so glad you're here!",
            timestamp: new Date(Date.now() - 1000 * 30), // 30 seconds ago
          },
        ])
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isLive])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Simulate receiving new messages periodically
  useEffect(() => {
    if (!isLive || !isConnected) return

    const welcomeMessages = [
      "So blessed to be able to join from home today!",
      "Praying for everyone in the congregation today.",
      "The sermon is really speaking to me today.",
      "Can someone share the Bible passage again?",
      "Amen! That's exactly what I needed to hear.",
    ]

    const interval = setInterval(() => {
      // 30% chance of receiving a new message
      if (Math.random() < 0.3) {
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
        const randomUser = ["Sarah W.", "Michael T.", "Rebecca J.", "David L."][Math.floor(Math.random() * 4)]

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            userId: `user${Math.floor(Math.random() * 1000)}`,
            userName: randomUser,
            content: randomMessage,
            timestamp: new Date(),
          },
        ])
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [isLive, isConnected])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user) return

    // Add the new message to the chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        userId: user.id,
        userName: `${user.firstName || ""} ${user.lastName?.[0] || ""}`.trim(),
        userImage: user.imageUrl,
        content: newMessage.trim(),
        timestamp: new Date(),
      },
    ])

    // Clear the input
    setNewMessage("")
  }

  if (!isLive) {
    return (
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Live Chat</h3>
        <p className="mt-2 text-sm text-muted-foreground">The live chat will be available when the service begins.</p>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Live Chat</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[500px] flex-col rounded-lg border">
      <div className="border-b p-3">
        <h3 className="font-semibold">Live Chat</h3>
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                {message.userImage ? (
                  <AvatarImage src={message.userImage || "/placeholder.svg"} alt={message.userName} />
                ) : null}
                <AvatarFallback>
                  {message.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{message.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        {isLoaded && user ? (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        ) : (
          <div className="text-center text-sm">
            <a href="/sign-in?redirect_url=/media/live" className="text-primary hover:underline">
              Sign in
            </a>{" "}
            to join the conversation
          </div>
        )}
      </div>
    </div>
  )
}
