"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import { EventCard } from "./EventCard"
import { eventsEndpoints, type Event } from "@/lib/api/endpoints/events"

export function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const data = await eventsEndpoints.getAll()
      setEvents(data)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
      // Fallback to mock data
      setEvents(eventsEndpoints.getMockEvents())
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="h-48 bg-muted" />
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Nenhum evento disponível</h3>
        <p className="text-muted-foreground">Volte em breve para descobrir novos eventos!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
