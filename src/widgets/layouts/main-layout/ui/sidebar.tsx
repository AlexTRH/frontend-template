import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@shared/lib/ui/cn'

import { navItems, devOnlyNavItems } from './nav-items'

export function Sidebar() {
    const { t } = useTranslation()
    const items = [...navItems, ...(import.meta.env.DEV ? devOnlyNavItems : [])]

    return (
        <aside className="border-border hidden w-56 flex-col border-r bg-card md:flex">
            <div className="border-border flex h-14 items-center border-b px-4">
                <span className="font-semibold">{t('common.title')}</span>
            </div>
            <nav className="flex flex-col gap-1 p-3">
                {items.map(({ to, route, icon: Icon }) => (
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
