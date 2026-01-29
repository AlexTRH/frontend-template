import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from '@shared/ui/sonner'
import type { WithChildren } from '@shared/types'
import { refreshToken } from '@shared/lib/fetch'
import { useAuth } from '@shared/contexts/auth'
import { RoutePath } from '@shared/config/router'

import { Header, AppSidebar } from './ui'

export function AuthenticatedLayout({ children }: WithChildren) {
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            void refreshToken()
            const interval = setInterval(
                () => {
                    void refreshToken()
                },
                4.5 * 60 * 1000
            )
            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return <Navigate replace to={RoutePath.login} />
    }

    return (
        <div className="w-screen">
            <Header />
            <AppSidebar />
            <main className="container mx-auto min-h-content p-4 mt-16">{children}</main>
            <Toaster richColors />
        </div>
    )
}
