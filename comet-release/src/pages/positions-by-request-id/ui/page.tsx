import { useLocation } from 'react-router-dom'
import { PositionsTable } from '@widgets/position/table'
import { PositionsTableFilter } from '@widgets/position/filters'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { RoutePath } from '@shared/config/router'

export function PositionsByRequestIDPage() {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const project_name = query.get('project_name') || ''
    const request_id = query.get('request_id') || ''

    const paths = [
        { title: 'Requests', to: RoutePath.requests },
        { title: project_name, to: RoutePath.requests + request_id },
        { title: 'Request positions', current: true },
    ]
    return (
        <>
            <Breadcrumbs paths={paths} />
            <PositionsTableFilter />
            <PositionsTable request_id={request_id} />
        </>
    )
}
