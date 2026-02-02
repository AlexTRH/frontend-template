import type { ReactNode } from 'react'
import { cn } from '@shared/lib/ui/cn'

type EmptyStateProps = {
    icon: ReactNode
    title: string
    description?: string
    action?: ReactNode
    className?: string
}

/**
 * Переиспользуемый блок пустого состояния: иконка, заголовок, опционально описание и кнопка.
 * Пример: список пуст, ничего не найдено по поиску.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('text-muted-foreground flex flex-col items-center gap-3 py-10', className)}>
            <span className="shrink-0 opacity-50 [&_svg]:size-10" aria-hidden>
                {icon}
            </span>
            <p className="text-center text-sm font-medium">{title}</p>
            {description && <p className="text-center text-sm">{description}</p>}
            {action}
        </div>
    )
}
