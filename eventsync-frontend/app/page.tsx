"use client"

import { useState } from "react"
import { Header } from "@/components/common/Header"
import { LoginModal } from "@/components/auth/LoginModal"
import { RegisterModal } from "@/components/auth/RegisterModal"
import { EventList } from "@/components/events/EventList"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setIsLoginOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-balance">Descubra Eventos Incríveis</h2>
          <p className="text-muted-foreground">Encontre e participe dos melhores eventos da sua região</p>
        </div>

        <EventList />
      </main>

      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} onRegisterClick={() => setIsRegisterOpen(true)} />
      <RegisterModal open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
      <Toaster />
    </div>
  )
}
