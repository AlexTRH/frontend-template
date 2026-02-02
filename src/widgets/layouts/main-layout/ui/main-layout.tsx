import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@shared/ui/sheet'
import { Button } from '@shared/ui/button'

import { Sidebar } from './sidebar'
import { navItems, devOnlyNavItems } from './nav-items'
import { Header } from './header'

export function MainLayout() {
    const { t } = useTranslation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <a
                    href="#main-content"
                    className="bg-primary text-primary-foreground focus:ring-ring fixed left-4 top-4 z-50 -translate-y-20 rounded-md px-4 py-2 text-sm font-medium shadow-md transition-transform focus:outline-none focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    {t('common.aria.skipToContent')}
                </a>
                <Header
                    leftContent={
                        <div className="md:hidden">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label={t('common.aria.menu')}
                            >
                                <Menu className="size-5" aria-hidden />
                            </Button>
                        </div>
                    }
                />
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetContent side="left" className="w-64 p-0">
                        <SheetHeader className="p-4 pb-2">
                            <SheetTitle>{t('common.title')}</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-1 p-3">
                            {[...navItems, ...(import.meta.env.DEV ? devOnlyNavItems : [])].map(
                                ({ to, route, icon: Icon }) => (
                                    <SidebarNavLink
                                        key={to}
                                        to={to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        icon={Icon}
                                        label={t(`common.nav.${route}`)}
                                    />
                                )
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
                <main id="main-content" className="flex-1 overflow-auto p-4 sm:p-6" tabIndex={-1}>
                    <div className="mx-auto w-full max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

function SidebarNavLink({
    to,
    onClick,
    icon: Icon,
    label,
}: {
    to: string
    onClick: () => void
    icon: React.ComponentType<{ className?: string }>
    label: string
}) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        >
            <Icon className="size-5 shrink-0" aria-hidden />
            {label}
        </Link>
    )
}
