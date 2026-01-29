import { useTranslation } from 'react-i18next'
import { Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { AppRoutes, RoutePath } from '@shared/config/router'

export function SettingsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <Breadcrumbs
                items={[
                    { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('settings.settings.title') },
                ]}
            />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('settings.settings.title')}</h1>
                <p className="text-muted-foreground mt-1">{t('settings.settings.subtitle')}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <SettingsIcon className="size-5" aria-hidden />
                        {t('settings.settings.general')}
                    </CardTitle>
                    <CardDescription>{t('settings.settings.generalDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">{t('settings.settings.comingSoon')}</p>
                </CardContent>
            </Card>
        </div>
    )
}
