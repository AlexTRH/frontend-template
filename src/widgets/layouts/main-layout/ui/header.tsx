import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@shared/ui/language-switcher'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { ThemeToggle } from '@features/theme-toggle'

export function Header() {
    const { t } = useTranslation()

    return (
        <header className="border-border sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-secondary px-4">
            <Link
                to={RoutePath[AppRoutes.HOME]}
                className="text-foreground hover:text-primary font-semibold transition-colors"
            >
                {t('common:common.title')}
            </Link>
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
            </div>
        </header>
    )
}
