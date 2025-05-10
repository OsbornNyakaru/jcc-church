"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Menu, Calendar, FileText, Users, Heart, MessageSquare, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/media/sermons", label: "Sermons", icon: FileText },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/connect/groups", label: "Groups", icon: Users },
    { href: "/connect/ministries", label: "Ministries", icon: Users },
    { href: "/connect/prayer", label: "Prayer", icon: MessageSquare },
    { href: "/give", label: "Give", icon: Heart },
    { href: "/contact", label: "Contact", icon: MessageSquare },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="container flex h-16 items-center justify-between">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 text-xs",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-1 flex-col gap-1 text-xs">
              <Menu className="h-5 w-5" />
              <span>More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <div className="grid grid-cols-3 gap-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-lg p-4 text-center",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
