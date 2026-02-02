import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@shared/ui/button'
import { cn } from '@shared/lib/ui/cn'
import { useTheme } from '@shared/contexts/theme'

export function ThemeToggle({ className }: { className?: string }) {
    const { t } = useTranslation()
    const { theme, setTheme } = useTheme()

    return (
        <div className={cn('flex gap-1', className)} role="group" aria-label={t('common.aria.theme')}>
            <Button
                type="button"
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
            >
                <Sun className="size-4" aria-hidden />
            </Button>
            <Button
                type="button"
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
            >
                <Moon className="size-4" aria-hidden />
            </Button>
        </div>
    )
}
