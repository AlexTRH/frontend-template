import { InterviewsTable } from '@widgets/interview/table'
import { InterviewsTableFilter } from '@widgets/interview/filters'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { RoutePath } from '@shared/config/router'

const paths = [
    { title: 'Requests', to: RoutePath.requests },
    { title: 'Interviews', current: true },
]

export function InterviewsPage() {
    return (
        <>
            <Breadcrumbs paths={paths} />
            <InterviewsTableFilter />
            <InterviewsTable />
        </>
    )
}
