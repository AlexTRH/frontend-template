import { useMemo } from 'react'
import { Error } from '@shared/ui/errors'
import { DataTable, DataTableSkeleton } from '@shared/ui/data-table'
import { useRequestsStore } from '@entities/request'

import { useFetchRequestsQuery } from './hooks'
import { columns } from './config'

export function RequestsTable() {
    const params = useRequestsStore((state) => state.params)
    const setParams = useRequestsStore((state) => state.setParams)
    const { isPending, data, error } = useFetchRequestsQuery(params)

    const columnVisibility = useMemo(() => {
        const shouldShowRate = data?.requests?.some((req) => req.rate && req.rate_currency) ?? false
        return {
            rate: shouldShowRate,
        }
    }, [data])

    return (
        <div className="space-y-4">
            {isPending && <DataTableSkeleton columnCount={columns.length} />}
            {data && (
                <DataTable
                    columns={columns}
                    data={data.requests}
                    total={data.total}
                    limit={params.limit}
                    offset={params.offset}
                    setParams={setParams}
                    columnVisibility={columnVisibility}
                />
            )}
            {error && <Error title="Error" description={error.message} />}
        </div>
    )
}
