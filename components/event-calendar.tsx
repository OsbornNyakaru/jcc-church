"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock data for events
const events = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: new Date(2024, 4, 5), // May 5, 2024
    category: "Worship",
  },
  {
    id: "2",
    title: "Sunday Worship Service",
    date: new Date(2024, 4, 12), // May 12, 2024
    category: "Worship",
  },
  {
    id: "3",
    title: "Sunday Worship Service",
    date: new Date(2024, 4, 19), // May 19, 2024
    category: "Worship",
  },
  {
    id: "4",
    title: "Sunday Worship Service",
    date: new Date(2024, 4, 26), // May 26, 2024
    category: "Worship",
  },
  {
    id: "5",
    title: "Youth Group Meeting",
    date: new Date(2024, 4, 3), // May 3, 2024
    category: "Youth",
  },
  {
    id: "6",
    title: "Youth Group Meeting",
    date: new Date(2024, 4, 10), // May 10, 2024
    category: "Youth",
  },
  {
    id: "7",
    title: "Youth Group Meeting",
    date: new Date(2024, 4, 17), // May 17, 2024
    category: "Youth",
  },
  {
    id: "8",
    title: "Youth Group Meeting",
    date: new Date(2024, 4, 24), // May 24, 2024
    category: "Youth",
  },
  {
    id: "9",
    title: "Community Outreach Day",
    date: new Date(2024, 4, 20), // May 20, 2024
    category: "Outreach",
  },
  {
    id: "10",
    title: "Women's Bible Study",
    date: new Date(2024, 4, 8), // May 8, 2024
    category: "Bible Study",
  },
  {
    id: "11",
    title: "Women's Bible Study",
    date: new Date(2024, 4, 22), // May 22, 2024
    category: "Bible Study",
  },
  {
    id: "12",
    title: "Men's Breakfast",
    date: new Date(2024, 4, 11), // May 11, 2024
    category: "Fellowship",
  },
]

interface EventCalendarProps {
  month?: string // Format: YYYY-MM
}

export function EventCalendar({ month }: EventCalendarProps) {
  const initialDate = month
    ? new Date(Number.parseInt(month.split("-")[0]), Number.parseInt(month.split("-")[1]) - 1)
    : new Date()

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {weekdays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
            <div key={`empty-start-${i}`} className="p-2 text-center text-sm text-muted-foreground" />
          ))}

          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

            return (
              <div
                key={day.toString()}
                className={cn(
                  "min-h-[100px] p-2 text-sm",
                  !isSameMonth(day, currentMonth) && "text-muted-foreground",
                  isSelected && "bg-primary/10",
                  isToday(day) && "font-bold text-primary",
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-right">{format(day, "d")}</div>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="truncate rounded-sm bg-primary/10 px-1 py-0.5 text-xs"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}

          {Array.from({ length: (7 - endOfMonth(currentMonth).getDay() - 1) % 7 }).map((_, i) => (
            <div key={`empty-end-${i}`} className="p-2 text-center text-sm text-muted-foreground" />
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
          <div className="mt-2 space-y-2">
            {getEventsForDay(selectedDate).length > 0 ? (
              getEventsForDay(selectedDate).map((event) => (
                <div key={event.id} className="rounded-md bg-muted p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-xs text-muted-foreground">{event.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
