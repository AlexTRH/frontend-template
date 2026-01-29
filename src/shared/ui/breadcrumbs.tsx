import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@shared/lib/ui/cn'

export type BreadcrumbItem = {
    label: string
    to?: string
}

type BreadcrumbsProps = {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    if (items.length === 0) return null

    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm', className)}>
            {items.map((item, i) => {
                const isLast = i === items.length - 1
                return (
                    <span key={i} className="flex items-center gap-1">
                        {i > 0 && <ChevronRight className="text-muted-foreground size-4 shrink-0" aria-hidden />}
                        {isLast || !item.to ? (
                            <span className="text-muted-foreground font-medium" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.to}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}
