import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const initialAuthContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppAuthContext = createContext<AuthContextInterface>(initialAuthContext)

export default function AuthContext({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated)
  return <AppAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppAuthContext.Provider>
}
