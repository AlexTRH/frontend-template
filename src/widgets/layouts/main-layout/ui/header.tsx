import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { LanguageSwitcher } from '@shared/ui/language-switcher'
import { Button } from '@shared/ui/button'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { ThemeToggle } from '@features/theme-toggle'

import { UserMenu } from './user-menu'

type HeaderProps = {
    leftContent?: ReactNode
}

export function Header({ leftContent }: HeaderProps) {
    const { t } = useTranslation()
    const user = useAuthStore((s) => s.user)

    return (
        <header className="border-border sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-secondary px-4 sm:px-6">
            {leftContent}
            <div className="flex flex-1 justify-end gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
                {user ? (
                    <UserMenu />
                ) : (
                    <Button asChild variant="ghost" size="sm">
                        <Link to={RoutePath[AppRoutes.LOGIN]}>{t('common.login')}</Link>
                    </Button>
                )}
            </div>
        </header>
    )
}
