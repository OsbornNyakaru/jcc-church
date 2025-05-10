import type { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"
import { Users, Calendar, FileText, MessageSquare } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { VisitorChart } from "@/components/admin/visitor-chart"
import { RecentDonations } from "@/components/admin/recent-donations"
import { UpcomingEventsList } from "@/components/admin/upcoming-events-list"
import { RecentPrayerRequests } from "@/components/admin/recent-prayer-requests"
import { getUserStats } from "@/lib/admin"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Church website administration dashboard",
}

export default async function AdminDashboardPage() {
  const user = await currentUser()
  const stats = await getUserStats()

  return (
    <div>
      <AdminPageHeader
        heading={`Welcome, ${user?.firstName || "Admin"}`}
        subheading="Here's what's happening with your church"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+{stats.newMembers} new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Next: {stats.nextEventName}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Sermons</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSermons}</div>
            <p className="text-xs text-muted-foreground">{stats.totalViews} total views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prayer Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prayerRequests}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingRequests} pending approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Website Visitors</CardTitle>
                <CardDescription>Daily website traffic for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <VisitorChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest contributions to the church</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentDonations />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for the next 14 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingEventsList />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prayer Requests</CardTitle>
                <CardDescription>Recent prayer requests from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPrayerRequests />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          {/* Analytics content */}
        </TabsContent>
        <TabsContent value="donations" className="mt-4">
          {/* Donations content */}
        </TabsContent>
        <TabsContent value="events" className="mt-4">
          {/* Events content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
