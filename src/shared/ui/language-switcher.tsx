import { useTranslation } from 'react-i18next'
import { Button } from '@shared/ui/button'
import { cn } from '@shared/lib/ui/cn'

const LOCALES = ['en', 'ru'] as const

export function LanguageSwitcher({ className }: { className?: string }) {
    const { i18n, t } = useTranslation()
    const current = i18n.language

    return (
        <div className={cn('flex gap-1', className)} role="group" aria-label={t('common.aria.language')}>
            {LOCALES.map((lng) => (
                <Button
                    key={lng}
                    type="button"
                    variant={current === lng ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => void i18n.changeLanguage(lng)}
                >
                    {lng.toUpperCase()}
                </Button>
            ))}
        </div>
    )
}
