import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { Skeleton } from '@shared/ui/skeleton'
import { useIsMobile } from '@shared/hooks'

type Props = {
    columnCount: number
    rowCount?: number
}
export function DataTableSkeleton({ columnCount, rowCount = 10 }: Props) {
    const isMobile = useIsMobile()
    const columns = Array.from({ length: columnCount }, (_, index) => index + 1)
    const rows = Array.from({ length: rowCount }, (_, index) => index + 1)

    if (isMobile) {
        return rows.map((row) => (
            <div key={row} className="border p-3 rounded-lg overflow-hidden bg-secondary shadow-md">
                {columns.map((column) => (
                    <div key={column} className="flex border-b last:border-b-0 py-3 gap-4">
                        <Skeleton className="h-6 w-1/2 text-left" />
                        <Skeleton className="h-6 w-1/2 text-right flex justify-end" />
                    </div>
                ))}
            </div>
        ))
    }

    return (
        <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column}>
                                    <Skeleton className="h-6 w-[100px]" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row}>
                                {columns.map((column) => (
                                    <TableCell key={column}>
                                        <Skeleton className="h-8 w-[100px]" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
