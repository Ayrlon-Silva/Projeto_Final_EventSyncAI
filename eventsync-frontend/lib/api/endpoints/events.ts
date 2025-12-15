import { api } from "../client"

export interface Event {
  id: string
  title: string
  description: string
  dateStart: string
  location: string
  bannerUrl: string
  price: number
  organizer: {
    name: string
  }
}

export const eventsEndpoints = {
  getAll: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>("/events")
    return response.data
  },

  getById: async (id: string): Promise<Event> => {
    const response = await api.get<Event>(`/events/${id}`)
    return response.data
  },

  // Mock data fallback
  getMockEvents: (): Event[] => [
    {
      id: "1",
      title: "Workshop de React",
      description: "Aprenda React do zero ao avançado.",
      dateStart: "2025-10-15T09:00:00.000Z",
      location: "Auditório Central",
      bannerUrl: "/workshop-react.jpg",
      price: 50.0,
      organizer: { name: "Professor Silva" },
    },
    {
      id: "2",
      title: "Meetup de JavaScript",
      description: "Encontro mensal da comunidade JS.",
      dateStart: "2025-11-20T18:00:00.000Z",
      location: "Tech Hub Downtown",
      bannerUrl: "/javascript-meetup.jpg",
      price: 0,
      organizer: { name: "Comunidade JS" },
    },
    {
      id: "3",
      title: "Conferência de IA",
      description: "Tendências em Inteligência Artificial.",
      dateStart: "2025-12-05T08:00:00.000Z",
      location: "Centro de Convenções",
      bannerUrl: "/ai-conference.jpg",
      price: 150.0,
      organizer: { name: "TechEvents Inc" },
    },
  ],
}
