"use client"

import { Calendar, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/useAuth"

interface HeaderProps {
  onLoginClick: () => void
}

export function Header({ onLoginClick }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">EventSync</h1>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Olá, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        ) : (
          <Button onClick={onLoginClick}>
            <LogIn className="mr-2 h-4 w-4" />
            Entrar
          </Button>
        )}
      </div>
    </header>
  )
}
