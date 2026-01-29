import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { Skeleton } from '@shared/ui/skeleton'

type TableSkeletonProps = {
    rows?: number
    cols?: number
}

export function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {Array.from({ length: cols }).map((_, i) => (
                        <TableHead key={i}>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: rows }).map((_, rowIdx) => (
                    <TableRow key={rowIdx}>
                        {Array.from({ length: cols }).map((_, colIdx) => (
                            <TableCell key={colIdx}>
                                <Skeleton className="h-4 w-full max-w-[120px]" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
