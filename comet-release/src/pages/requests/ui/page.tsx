import { RequestsTable } from '@widgets/request/table'
import { RequestTableFilters } from '@widgets/request/filters'
import { Breadcrumbs } from '@shared/ui'
import { RoutePath } from '@shared/config/router'
import { CreateRequestModal } from '@features/request'

const paths = [{ title: 'Requests', to: RoutePath.requests, current: true }]

export function RequestsPage() {
    return (
        <>
            <Breadcrumbs paths={paths} />
            <RequestTableFilters slot={<CreateRequestModal />} />
            <RequestsTable />
        </>
    )
}
