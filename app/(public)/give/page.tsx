import type { Metadata } from "next"
import { Heart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { DonationForm } from "@/components/donation-form"
import { RecurringDonationForm } from "@/components/recurring-donation-form"

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission and ministries of Grace Community Church through your generous giving.",
}

export default function GivePage() {
  return (
    <div className="container py-8">
      <PageHeader heading="Give" subheading="Support our mission and ministries through your generous giving" />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Why We Give</h2>
          <p className="mt-2 text-muted-foreground">
            Your generosity enables us to reach more people with the love of Christ, support those in need, and create a
            welcoming community for all. Every gift, no matter the size, makes a difference in our mission.
          </p>

          <div className="mt-6 grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  General Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supports our day-to-day operations, staff, facilities, and core ministries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Missions & Outreach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supports our local and global mission partners and community outreach initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Building Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Helps maintain and improve our facilities for ministry and community use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Tabs defaultValue="one-time">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="one-time">One-Time Gift</TabsTrigger>
              <TabsTrigger value="recurring">Recurring Gift</TabsTrigger>
            </TabsList>
            <TabsContent value="one-time" className="mt-4">
              <DonationForm />
            </TabsContent>
            <TabsContent value="recurring" className="mt-4">
              <RecurringDonationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-muted p-6">
        <h2 className="text-2xl font-bold">Other Ways to Give</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>By Mail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Send checks payable to "Grace Community Church" to:
                <br />
                <br />
                123 Faith Street
                <br />
                Anytown, ST 12345
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text to Give</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Text "GIVE" followed by the amount to (555) 123-4567.
                <br />
                <br />
                Example: "GIVE 50" to donate $50 to the general fund.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Planned Giving</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Consider including Grace Community Church in your estate planning.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-1">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
