import { Error } from '@shared/ui/errors'
import { DataTable, DataTableSkeleton } from '@shared/ui/data-table'
import { useInterviewsStore } from '@entities/interview/stage'

import { useFetchInterviewsQuery } from './hooks'
import { columns } from './config'

export function InterviewsTable() {
    const params = useInterviewsStore((state) => state.params)
    const setParams = useInterviewsStore((state) => state.setParams)
    const { isPending, data, error } = useFetchInterviewsQuery(params)

    return (
        <div className="space-y-4">
            {isPending && <DataTableSkeleton columnCount={columns.length} />}
            {data && (
                <DataTable
                    columns={columns}
                    data={data.interviews}
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
