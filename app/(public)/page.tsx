import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Play, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { LatestSermons } from "@/components/latest-sermons"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ServiceTimes } from "@/components/service-times"

export const metadata: Metadata = {
  title: "Welcome to JCC Nakuru Church",
  description: "Join us for worship, community, and spiritual growth.",
}

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroSection />

      <section className="container grid gap-6 py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Welcome to JCC Nakuru Church
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            A place where faith, community, and purpose come together. Join us as we worship, grow, and serve together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Join Us</h3>
            <p className="text-center text-sm text-muted-foreground">
              Sunday services at 9:00 AM and 11:00 AM. Wednesday night Bible study at 7:00 PM.
            </p>
            <Link href="/visit" className="mt-2">
              <Button variant="link" className="gap-1">
                Plan Your Visit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Watch & Listen</h3>
            <p className="text-center text-sm text-muted-foreground">
              Stream our services live or watch past sermons from our media library.
            </p>
            <Link href="/media/sermons" className="mt-2">
              <Button variant="link" className="gap-1">
                Browse Sermons <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Get Involved</h3>
            <p className="text-center text-sm text-muted-foreground">
              Find a small group, volunteer opportunity, or ministry that fits your gifts.
            </p>
            <Link href="/connect/groups" className="mt-2">
              <Button variant="link" className="gap-1">
                Find Your Place <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container">
          <UpcomingEvents />
        </div>
      </section>

      <section className="container py-12">
        <LatestSermons />
      </section>

      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <NewsletterSignup />
        </div>
      </section>

      <section className="container py-12">
        <ServiceTimes />
      </section>
    </div>
  )
}
