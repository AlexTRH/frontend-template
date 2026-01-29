import { Error } from '@shared/ui/errors'
import { DataTable, DataTableSkeleton } from '@shared/ui/data-table'
import { useCandidatesStore } from '@entities/candidate'

import { useFetchCandidatesQuery } from './hooks'
import { columns } from './config'

export function CandidatesTable() {
    const params = useCandidatesStore((state) => state.params)
    const setParams = useCandidatesStore((state) => state.setParams)
    const { isPending, data, error } = useFetchCandidatesQuery(params)

    return (
        <div className="space-y-4">
            {isPending && <DataTableSkeleton columnCount={columns.length} />}
            {data && (
                <DataTable
                    columns={columns}
                    data={data.persons}
                    total={data.total}
                    limit={params.limit}
                    offset={params.offset}
                    setParams={setParams}
                />
            )}
            {error && <Error title="Error" description={error.message} />}
        </div>
    )
}
