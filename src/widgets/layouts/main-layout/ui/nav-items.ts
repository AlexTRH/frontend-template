import { LayoutDashboard, List, Settings, Box } from 'lucide-react'
import { AppRoutes, RoutePath } from '@shared/config/router'

export const navItems = [
    { to: RoutePath[AppRoutes.DASHBOARD], route: AppRoutes.DASHBOARD, icon: LayoutDashboard },
    { to: RoutePath[AppRoutes.ITEMS], route: AppRoutes.ITEMS, icon: List },
    { to: RoutePath[AppRoutes.SETTINGS], route: AppRoutes.SETTINGS, icon: Settings },
] as const

/** Пункты навигации только для dev (страница «Компоненты»). */
export const devOnlyNavItems = [
    { to: RoutePath[AppRoutes.COMPONENTS], route: AppRoutes.COMPONENTS, icon: Box },
] as const
