import { PositionsTable } from '@widgets/position/table'
import { PositionsTableFilter } from '@widgets/position/filters'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { RoutePath } from '@shared/config/router'

const paths = [
    { title: 'Requests', to: RoutePath.requests },
    { title: 'Request positions', to: RoutePath.positions, current: true },
]

export function PositionsPage() {
    return (
        <>
            <Breadcrumbs paths={paths} />
            <PositionsTableFilter />
            <PositionsTable />
        </>
    )
}
