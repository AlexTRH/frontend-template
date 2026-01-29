import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@shared/ui/button'
import { AppRoutes, RoutePath } from '@shared/config/router'

export function NotFoundPage() {
    const { t } = useTranslation()

    return (
        <div className="fullscreen-center flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{t('common:common.notFound')}</h1>
            <Button asChild>
                <Link to={RoutePath[AppRoutes.HOME]}>Go home</Link>
            </Button>
        </div>
    )
}
