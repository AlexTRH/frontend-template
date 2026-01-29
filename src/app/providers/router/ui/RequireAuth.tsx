import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { PageLoader } from '@shared/ui/page-loader'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'

const HYDRATE_TIMEOUT_MS = 500

export function RequireAuth() {
    const user = useAuthStore((s) => s.user)
    const hasHydrated = useAuthStore((s) => s._hasHydrated)
    const setHasHydrated = useAuthStore((s) => s.setHasHydrated)
    const fallbackDone = useRef(false)

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
