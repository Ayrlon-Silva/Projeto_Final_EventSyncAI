"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { authEndpoints, type LoginRequest, type RegisterRequest } from "@/lib/api/endpoints/auth"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedToken = localStorage.getItem("access_token")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (credentials: LoginRequest) => {
    const response = await authEndpoints.login(credentials)

    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("user", JSON.stringify(response.user))

    setToken(response.access_token)
    setUser(response.user)
  }

  const register = async (data: RegisterRequest) => {
    const response = await authEndpoints.register(data)

    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("user", JSON.stringify(response.user))

    setToken(response.access_token)
    setUser(response.user)
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
