import { Navigate } from 'react-router-dom'
import type { WithChildren } from '@shared/types'
import { useAuth } from '@shared/contexts/auth'
import { RoutePath } from '@shared/config/router'

export function PublicLayout({ children }: WithChildren) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate replace to={RoutePath.requests} />
    }

    return children
}
