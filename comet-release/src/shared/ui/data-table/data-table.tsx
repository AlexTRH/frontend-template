import type { ColumnDef, VisibilityState } from '@tanstack/react-table'
import type { QueryParamsPayload } from '@shared/types'
import { useIsMobile } from '@shared/hooks'

import { MobileTable } from './mobile-table'
import { DesktopTable } from './desktop-table'
import { DataTablePagination } from './data-table-pagination'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    columnVisibility?: VisibilityState
    total: number
    limit: number
    offset: number
    setParams: (params: QueryParamsPayload) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    columnVisibility = {},
    total,
    limit,
    offset,
    setParams,
}: DataTableProps<TData, TValue>) {
    const isMobile = useIsMobile()

    return (
        <div className="space-y-4">
            {/*TABLE*/}
            {isMobile ? (
                <MobileTable columns={columns} data={data} columnVisibility={columnVisibility} />
            ) : (
                <DesktopTable columns={columns} data={data} columnVisibility={columnVisibility} />
            )}

            {/* PAGINATION */}
            <DataTablePagination total={total} limit={limit} offset={offset} setParams={setParams} />
        </div>
    )
}
