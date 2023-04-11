import { User } from './user.type'
import { ResponseSuccess } from './utils.type'

export type AuthResponse = ResponseSuccess<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
