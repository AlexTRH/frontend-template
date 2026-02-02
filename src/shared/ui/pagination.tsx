import { Button } from '@shared/ui/button'
import { cn } from '@shared/lib/ui/cn'

type PaginationProps = {
    /** 0-based current page */
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    labelPrevious: string
    labelNext: string
    labelPageOf: string
    className?: string
}

/**
 * Переиспользуемая пагинация: текст «Стр. X из Y» и кнопки Назад/Вперёд.
 * Логику среза данных (slice) оставляем на странице; здесь только UI.
 */
export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    labelPrevious,
    labelNext,
    labelPageOf,
    className,
}: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div
            className={cn('flex items-center justify-between border-t pt-4', className)}
            role="navigation"
            aria-label="Pagination"
        >
            <p className="text-muted-foreground text-sm">{labelPageOf}</p>
            <div className="flex shrink-0 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 0}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    {labelPrevious}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    {labelNext}
                </Button>
            </div>
        </div>
    )
}
