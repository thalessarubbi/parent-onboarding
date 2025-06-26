import { createContext, useState } from 'react'
import { initializeUserFamilyMembers } from '@/src/services/local-api'
import { UserDTO } from '@/src/types/user'

export type AuthContextDataProps = {
  user: UserDTO
  signUp: (user: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signUp(user: UserDTO) {
    setUser(user)
    initializeUserFamilyMembers(user.id)
  }

  return (
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}