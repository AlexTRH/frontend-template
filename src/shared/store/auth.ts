import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { User } from '@entities/user'

const AUTH_STORAGE_KEY = 'auth'

type AuthState = {
    user: User | null
    token: string | null
    _hasHydrated: boolean
}

type AuthActions = {
    setAuth: (user: User, token: string) => void
    logout: () => void
    setHasHydrated: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            _hasHydrated: false,
            setAuth: (user, token) => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('token', token)
                }
                set({ user, token })
            },
            logout: () => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('token')
                }
                set({ user: null, token: null })
            },
            setHasHydrated: () => set({ _hasHydrated: true }),
        }),
        {
            name: AUTH_STORAGE_KEY,
            partialize: (state) => ({ user: state.user, token: state.token }),
            onRehydrateStorage: () => () => {
                useAuthStore.setState({ _hasHydrated: true })
            },
        }
    )
)
