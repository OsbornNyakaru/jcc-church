import { MapPin, Clock, Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ServiceTimes() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">Join Us for Worship</h2>
      <p className="mt-2 text-muted-foreground">
        We invite you to join us for worship services and other weekly gatherings.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sunday Services</CardTitle>
            <CardDescription>Weekly worship services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>9:00 AM & 11:00 AM</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Main Sanctuary</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/visit">Plan Your Visit</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wednesday Bible Study</CardTitle>
            <CardDescription>Midweek teaching and prayer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>7:00 PM</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Fellowship Hall</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/connect/groups">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Youth Group</CardTitle>
            <CardDescription>For students grades 6-12</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Fridays</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>6:30 PM</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/connect/youth">Youth Ministry</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
