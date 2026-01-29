import { AppRoutes, RoutePath } from '@shared/config/router'
import { NotFoundPage } from '@pages/not-found'
import { HomePage } from '@pages/home'

export const enum RouteLayout {
    DEFAULT = 'default',
}

type RouteConfigItem = {
    path: string
    element: React.ReactNode
    layout: RouteLayout
}

export const routeConfig: Record<AppRoutes, RouteConfigItem> = {
    [AppRoutes.HOME]: {
        path: RoutePath[AppRoutes.HOME],
        element: <HomePage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
        layout: RouteLayout.DEFAULT,
    },
}
