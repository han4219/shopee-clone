import { AuthResponse } from 'src/types/auth.type'
import request from 'src/utils/http'

export const registerRequest = (body: { email: string; password: string }) =>
  request.post<AuthResponse>('/register', body)

export const loginRequest = (body: { email: string; password: string }) => request.post<AuthResponse>('/login', body)
