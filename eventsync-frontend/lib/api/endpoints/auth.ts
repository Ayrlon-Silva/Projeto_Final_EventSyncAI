import { api } from "../client"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  access_token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authEndpoints = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", data)
    return response.data
  },
}
