import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { PageLoader } from '@shared/ui/page-loader'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'

// Zustand persist восстанавливает user из localStorage асинхронно. Пока _hasHydrated === false,
// не редиректим на логин — иначе после перезагрузки сразу улетим на /login до гидрации.
const HYDRATE_TIMEOUT_MS = 500

export function RequireAuth() {
    const user = useAuthStore((s) => s.user)
    const hasHydrated = useAuthStore((s) => s._hasHydrated)
    const setHasHydrated = useAuthStore((s) => s.setHasHydrated)
    const fallbackDone = useRef(false)

    // Fallback: если persist так и не вызвал onRehydrate, через HYDRATE_TIMEOUT_MS считаем гидрацию завершённой.
    useEffect(() => {
        if (hasHydrated || fallbackDone.current) return
        const t = setTimeout(() => {
            if (!useAuthStore.getState()._hasHydrated) {
                fallbackDone.current = true
                setHasHydrated()
            }
        }, HYDRATE_TIMEOUT_MS)
        return () => clearTimeout(t)
    }, [hasHydrated, setHasHydrated])

    if (!hasHydrated) {
        return <PageLoader />
    }

    if (!user) {
        return <Navigate to={RoutePath[AppRoutes.LOGIN]} replace />
    }

    return <Outlet />
}
