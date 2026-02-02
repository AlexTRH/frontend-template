import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { STORAGE_KEYS } from '@shared/constants'
import type { User } from '@entities/user'

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
            name: STORAGE_KEYS.AUTH,
            partialize: (state) => ({ user: state.user, token: state.token }),
            onRehydrateStorage: () => () => {
                useAuthStore.setState({ _hasHydrated: true })
            },
        }
    )
)
