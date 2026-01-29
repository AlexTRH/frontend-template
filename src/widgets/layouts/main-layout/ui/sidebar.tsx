import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, List, Settings } from 'lucide-react'
import { cn } from '@shared/lib/ui/cn'
import { AppRoutes, RoutePath } from '@shared/config/router'

const navItems = [
    { to: RoutePath[AppRoutes.DASHBOARD], route: AppRoutes.DASHBOARD, icon: LayoutDashboard },
    { to: RoutePath[AppRoutes.ITEMS], route: AppRoutes.ITEMS, icon: List },
    { to: RoutePath[AppRoutes.SETTINGS], route: AppRoutes.SETTINGS, icon: Settings },
] as const

export function Sidebar() {
    const { t } = useTranslation()

    return (
        <aside className="border-border flex w-56 flex-col border-r bg-card">
            <div className="border-border flex h-14 items-center border-b px-4">
                <span className="font-semibold">{t('common:common.title')}</span>
            </div>
            <nav className="flex flex-col gap-1 p-3">
                {navItems.map(({ to, route, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )
                        }
                    >
                        <Icon className="size-5 shrink-0" aria-hidden />
                        {t(`common.nav.${route}`)}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
