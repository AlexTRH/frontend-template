import type { ColumnDef } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable, type VisibilityState } from '@tanstack/react-table'
import { Table } from '@shared/ui/table'
import { DataTableHeader, DataTableBody } from '@shared/ui/data-table'

type Props<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    columnVisibility?: VisibilityState
}
export function DesktopTable<TData, TValue>({ data, columns, columnVisibility }: Props<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            columnVisibility,
        },
    })
    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <DataTableHeader table={table} />
                <DataTableBody table={table} columns={columns} />
            </Table>
        </div>
    )
}
