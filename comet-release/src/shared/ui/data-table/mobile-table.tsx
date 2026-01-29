import type { ColumnDef, Row, VisibilityState } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { cn } from '@shared/lib/ui'

type TableCardListProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    columnVisibility?: VisibilityState
}
export function MobileTable<TData, TValue>({ columns, data, columnVisibility }: TableCardListProps<TData, TValue>) {
    const actionColumnIndex = columns.findIndex((column) => column.id === 'actions')
    if (actionColumnIndex !== -1) {
        const [actionColumn] = columns.splice(actionColumnIndex, 1)
        columns.unshift(actionColumn)
    }
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
        <div className="space-y-3">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => <MobileTableCard key={row.id} row={row} />)
            ) : (
                <div className="border p-4 rounded-lg text-center bg-secondary shadow-md">No results.</div>
            )}
        </div>
    )
}

type TableCardProps<TData> = {
    row: Row<TData>
}
function MobileTableCard<TData>({ row }: TableCardProps<TData>) {
    const cells = row.getVisibleCells()
    return (
        <div className="border p-3 rounded-lg overflow-hidden bg-card shadow-sm">
            {cells.map((cell) => {
                const header = cell.column.columnDef.header
                return (
                    <div
                        key={cell.id}
                        className="flex justify-end border-b first:border-b-0 last:border-b-0 py-3 first:py-0"
                    >
                        {typeof header === 'string' && <div className="w-1/2 text-left font-semibold">{header}:</div>}
                        <div
                            className={cn(
                                'w-1/2 text-left flex justify-start underline-offset-4 has-[>a]:underline md:has-[>a]:no-underline',
                                { 'justify-end': cell.id.includes('actions') }
                            )}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
