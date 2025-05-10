import { Calendar, Clock, MapPin, Music, FileText, User } from "lucide-react"

export function UpcomingServiceInfo() {
  return (
    <div className="rounded-lg border">
      <div className="border-b p-3">
        <h3 className="font-semibold">Today's Service</h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Sunday Service</div>
            <div className="text-sm text-muted-foreground">May 12, 2024</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Service Times</div>
            <div className="text-sm text-muted-foreground">9:00 AM & 11:00 AM</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Location</div>
            <div className="text-sm text-muted-foreground">123 Faith Street, Anytown, ST 12345</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Speaker</div>
            <div className="text-sm text-muted-foreground">Pastor John Smith</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Sermon Title</div>
            <div className="text-sm text-muted-foreground">Finding Peace in Troubled Times</div>
            <div className="mt-1 text-xs text-muted-foreground">Scripture: Philippians 4:6-7</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Music className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">Worship</div>
            <div className="text-sm text-muted-foreground">Led by the Grace Worship Team</div>
          </div>
        </div>
      </div>

      <div className="border-t p-3">
        <div className="text-center text-sm">
          <a href="/media/sermons" className="text-primary hover:underline">
            View Past Sermons
          </a>
        </div>
      </div>
    </div>
  )
}
