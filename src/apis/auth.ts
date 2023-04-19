import { AuthResponse } from 'src/types/auth.type'
import request from 'src/utils/http'

const authApi = {
  register(body: { email: string; password: string }) {
    return request.post<AuthResponse>('/register', body)
  },
  login(body: { email: string; password: string }) {
    return request.post<AuthResponse>('/login', body)
  },
  logout() {
    return request.post('/logout')
  }
}

export default authApi
