"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Settings,
  BarChart,
  Menu,
  LogOut,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Content",
    items: [
      {
        title: "Sermons",
        href: "/admin/sermons",
        icon: FileText,
      },
      {
        title: "Live Stream",
        href: "/admin/live-stream",
        icon: Video,
      },
      {
        title: "Events",
        href: "/admin/events",
        icon: Calendar,
      },
      {
        title: "Blog Posts",
        href: "/admin/blog",
        icon: FileText,
      },
      {
        title: "Pages",
        href: "/admin/pages",
        icon: FileText,
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Members",
        href: "/admin/members",
        icon: Users,
      },
      {
        title: "Small Groups",
        href: "/admin/groups",
        icon: Users,
      },
      {
        title: "Prayer Requests",
        href: "/admin/prayer-requests",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Giving",
    items: [
      {
        title: "Donations",
        href: "/admin/donations",
        icon: Heart,
      },
      {
        title: "Campaigns",
        href: "/admin/campaigns",
        icon: Heart,
      },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  return (
    <>
      <aside className="fixed top-0 z-30 hidden h-screen w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <span className="text-xl">JCC Nakuru</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <SidebarNav items={sidebarNavItems} />
        </ScrollArea>
      </aside>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/admin" className="flex items-center gap-2 font-bold">
                <span className="text-xl">JCC Nakuru</span>
              </Link>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
              <SidebarNav items={sidebarNavItems} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

interface SidebarNavProps {
  items: {
    title: string
    href?: string
    icon?: React.ComponentType<{ className?: string }>
    items?: {
      title: string
      href: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        if (item.href && !item.items) {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent text-accent-foreground",
              )}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              <span>{item.title}</span>
            </Link>
          )
        }

        return (
          <div key={index} className="space-y-1">
            <h4 className="px-2 py-1 text-sm font-medium text-muted-foreground">{item.title}</h4>
            {item.items?.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === subItem.href && "bg-accent text-accent-foreground",
                )}
              >
                {subItem.icon && <subItem.icon className="h-5 w-5" />}
                <span>{subItem.title}</span>
              </Link>
            ))}
          </div>
        )
      })}

      <div className="mt-auto pt-4">
        <Link href="/sign-out">
          <Button variant="outline" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  )
}
