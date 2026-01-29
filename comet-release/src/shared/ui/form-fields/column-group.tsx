import type { WithChildren } from '@shared/types'
import { cn } from '@shared/lib/ui/cn'

type Props = {
    gridCol?: string
}
export function ColumnGroup({ children, gridCol = 'grid-cols-2' }: Props & WithChildren) {
    return <div className={cn('flex flex-col md:grid gap-4', gridCol)}>{children}</div>
}
