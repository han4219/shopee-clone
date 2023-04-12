import { AuthResponse } from 'src/types/auth.type'
import request from 'src/utils/http'

export const register = (body: { email: string; password: string }) => request.post<AuthResponse>('/register', body)

export const login = (body: { email: string; password: string }) => request.post<AuthResponse>('/login', body)

export const logout = () => request.post('/logout')
