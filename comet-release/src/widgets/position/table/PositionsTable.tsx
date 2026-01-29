import { Error } from '@shared/ui/errors'
import { DataTable, DataTableSkeleton } from '@shared/ui/data-table'
import type { UuId } from '@shared/types'
import { usePositionsStore } from '@entities/position'

import { useFetchPositionsByRequestIdQuery } from './hooks'
import { columns } from './config'

type Props = {
    request_id?: UuId
}
export function PositionsTable({ request_id }: Props) {
    const params = usePositionsStore((state) => state.params)
    const setParams = usePositionsStore((state) => state.setParams)
    const { isPending, data, error } = useFetchPositionsByRequestIdQuery({ request_id, params })

    return (
        <div className="space-y-4">
            {isPending && <DataTableSkeleton columnCount={columns.length} />}
            {data && (
                <DataTable
                    columns={columns}
                    data={data.positions}
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
