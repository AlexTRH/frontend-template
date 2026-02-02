import React from 'react'
import { AppRoutes, RoutePath } from '@shared/config/router'

export const enum RouteLayout {
    DEFAULT = 'default',
}

type RouteConfigItem = {
    path: string
    element: React.ReactNode
    layout: RouteLayout
}

type LazyModule = Promise<{ default: React.ComponentType }>

function lazyPage(fn: () => LazyModule): React.LazyExoticComponent<React.ComponentType> {
    return React.lazy(fn)
}

const LazyDashboardPage = lazyPage(() =>
    import('@pages/dashboard').then((m: { DashboardPage: React.ComponentType }) => ({ default: m.DashboardPage }))
)
const LazyItemsPage = lazyPage(() =>
    import('@pages/items').then((m: { ItemsPage: React.ComponentType }) => ({ default: m.ItemsPage }))
)
const LazyItemDetailPage = lazyPage(() =>
    import('@pages/item-detail').then((m: { ItemDetailPage: React.ComponentType }) => ({ default: m.ItemDetailPage }))
)
const LazySettingsPage = lazyPage(() =>
    import('@pages/settings').then((m: { SettingsPage: React.ComponentType }) => ({ default: m.SettingsPage }))
)
const LazyComponentsPage = lazyPage(() =>
    import('@pages/components').then((m: { ComponentsPage: React.ComponentType }) => ({ default: m.ComponentsPage }))
)
const LazyLoginPage = lazyPage(() =>
    import('@pages/login').then((m: { LoginPage: React.ComponentType }) => ({ default: m.LoginPage }))
)
const LazyNotFoundPage = lazyPage(() =>
    import('@pages/not-found').then((m: { NotFoundPage: React.ComponentType }) => ({ default: m.NotFoundPage }))
)

export const routeConfig: Record<AppRoutes, RouteConfigItem> = {
    [AppRoutes.DASHBOARD]: {
        path: RoutePath[AppRoutes.DASHBOARD],
        element: <LazyDashboardPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.ITEMS]: {
        path: RoutePath[AppRoutes.ITEMS],
        element: <LazyItemsPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.ITEM_DETAIL]: {
        path: RoutePath[AppRoutes.ITEM_DETAIL],
        element: <LazyItemDetailPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath[AppRoutes.SETTINGS],
        element: <LazySettingsPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.COMPONENTS]: {
        path: RoutePath[AppRoutes.COMPONENTS],
        element: <LazyComponentsPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath[AppRoutes.LOGIN],
        element: <LazyLoginPage />,
        layout: RouteLayout.DEFAULT,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <LazyNotFoundPage />,
        layout: RouteLayout.DEFAULT,
    },
}
