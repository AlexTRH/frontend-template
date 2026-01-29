import { CandidatesTable } from '@widgets/candidates/table'
import { CandidatesTableFilter } from '@widgets/candidates/filters'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { RoutePath } from '@shared/config/router'

const paths = [
    { title: 'Requests', to: RoutePath.requests },
    { title: 'Candidates', to: RoutePath.candidates, current: true },
]

export function CandidatesPage() {
    return (
        <>
            <Breadcrumbs paths={paths} />
            <CandidatesTableFilter />
            <CandidatesTable />
        </>
    )
}
