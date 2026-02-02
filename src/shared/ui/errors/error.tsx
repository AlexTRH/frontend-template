import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { Button } from '@shared/ui/button'

type Props = {
    title?: string
    description?: string
    slot?: ReactNode
}

const reload = () => {
    window.location.reload()
}

export function Error({ title, description, slot }: Props) {
    const { t } = useTranslation()
    const resolvedTitle = title ?? t('common.errorTitle')
    const resolvedDescription = description ?? t('common.errorDescription')
    const resolvedSlot = slot ?? <Button onClick={reload}>{t('common.reload')}</Button>
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <h1>{resolvedTitle}</h1>
            <p className="text-secondary-foreground text-2xl">{resolvedDescription}</p>
            {resolvedSlot}
        </div>
    )
}
