import type { ReactNode } from 'react'
import { isAuthenticatedLocally } from '@shared/lib/local-storage'
import useLocalStorage from '@shared/hooks/use-local-storage'
import { AuthContext } from '@shared/contexts/auth'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useLocalStorage<boolean>('isAuthenticated', isAuthenticatedLocally())

    return <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AuthContext.Provider>
}
