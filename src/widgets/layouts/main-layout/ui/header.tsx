import { Link } from 'react-router-dom'
import { LanguageSwitcher } from '@shared/ui/language-switcher'
import { Button } from '@shared/ui/button'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { ThemeToggle } from '@features/theme-toggle'

import { UserMenu } from './user-menu'

export function Header() {
    const user = useAuthStore((s) => s.user)

    return (
        <header className="border-border sticky top-0 z-10 flex h-14 items-center justify-end gap-3 border-b bg-secondary px-6">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
                <UserMenu />
            ) : (
                <Button asChild variant="ghost" size="sm">
                    <Link to={RoutePath[AppRoutes.LOGIN]}>Login</Link>
                </Button>
            )}
        </header>
    )
}
