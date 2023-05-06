import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getUserFromLS } from 'src/utils/auth'

interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  reset: () => void
}

const initialAuthContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  user: getUserFromLS(),
  setUser: () => null,
  reset: () => null
}

export const AppAuthContext = createContext<AuthContextInterface>(initialAuthContext)

export default function AuthContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(initialAuthContext.user)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated)
  const reset = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AppAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, reset }}>
      {children}
    </AppAuthContext.Provider>
  )
}
