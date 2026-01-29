import type { CSSProperties } from 'react'
import { Skeleton } from '@shared/ui/skeleton'

type Props = {
    rows?: { columns: number }[]
}
export function GridMapperSkeleton({ rows = [{ columns: 3 }, { columns: 2 }] }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {rows.map(({ columns }, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-4"
                    style={{ '--cols': columns } as CSSProperties}
                >
                    {Array.from({ length: columns }).map((_, index) => (
                        <Skeleton key={index} className="h-[320px]" />
                    ))}
                </div>
            ))}
        </div>
    )
}
