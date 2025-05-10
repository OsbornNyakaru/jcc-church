import type { Metadata } from "next"
import { Suspense } from "react"

import { PageHeader } from "@/components/page-header"
import { PrayerRequestForm } from "@/components/prayer-request-form"
import { PrayerRequestList } from "@/components/prayer-request-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Prayer Requests",
  description: "Submit prayer requests and pray for others in our community",
}

export default function PrayerRequestPage() {
  return (
    <div className="container py-8">
      <PageHeader
        heading="Prayer Requests"
        subheading="Submit your prayer requests and join us in praying for others"
      />

      <div className="mt-8">
        <Tabs defaultValue="submit">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="submit">Submit Request</TabsTrigger>
            <TabsTrigger value="pray">Pray for Others</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Prayer Request</CardTitle>
                <CardDescription>Share your prayer needs with our church family and prayer team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading form...</div>}>
                  <PrayerRequestForm />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pray" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Prayer Requests</CardTitle>
                <CardDescription>Join us in praying for these requests from our church family.</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading prayer requests...</div>}>
                  <PrayerRequestList />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
