import Link from "next/link"
import Image from "next/image"
import { Play, Calendar, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/church-image-three.jpg?height=600&width=1600"
          alt="Church sanctuary"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-[600px] flex-col items-center justify-center text-center text-white">
        <div className="container max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Grace Community Church
          </h1>
          <p className="mb-8 text-lg sm:text-xl">A place to belong, believe, and become</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/media/live">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" /> Watch Live
              </Button>
            </Link>
            <Link href="/visit">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/30"
              >
                <Calendar className="h-5 w-5" /> Plan Your Visit
              </Button>
            </Link>
            <Link href="/give">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/30"
              >
                <Heart className="h-5 w-5" /> Give
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="mb-2 text-lg font-medium">Join Us This Sunday</p>
            <p className="text-xl font-bold">9:00 AM & 11:00 AM</p>
            <p className="mt-1">123 Faith Street, Anytown, ST 12345</p>
          </div>
        </div>
      </div>
    </section>
  )
}
