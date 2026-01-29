import { AppRoutes, RoutePath } from '@shared/config/router'
import { SettingsPage } from '@pages/settings'
import { NotFoundPage } from '@pages/not-found'
import { LoginPage } from '@pages/login'
import { ItemsPage } from '@pages/items'
import { DashboardPage } from '@pages/dashboard'

export const enum RouteLayout {
    DEFAULT = 'default',
}

type RouteConfigItem = {
    path: string
    element: React.ReactNode
    layout: RouteLayout
}

export const routeConfig: Record<AppRoutes, RouteConfigItem> = {
    [AppRoutes.DASHBOARD]: {
        path: RoutePath[AppRoutes.DASHBOARD],
        element: <DashboardPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.ITEMS]: {
        path: RoutePath[AppRoutes.ITEMS],
        element: <ItemsPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath[AppRoutes.SETTINGS],
        element: <SettingsPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath[AppRoutes.LOGIN],
        element: <LoginPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
        layout: RouteLayout.DEFAULT,
    },
}
