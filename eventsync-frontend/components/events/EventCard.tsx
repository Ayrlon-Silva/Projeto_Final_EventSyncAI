import { Calendar, MapPin, DollarSign } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/api/endpoints/events"
import { formatDate, formatPrice } from "@/lib/utils/formatters"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img src={event.bannerUrl || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold text-balance">{event.title}</h3>
        <p className="text-sm text-muted-foreground text-pretty">{event.description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(event.dateStart)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{formatPrice(event.price)}</span>
        </div>
        <p className="text-xs text-muted-foreground">Por: {event.organizer.name}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ver Detalhes</Button>
      </CardFooter>
    </Card>
  )
}
