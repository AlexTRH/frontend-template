import { Skeleton } from '@shared/ui/skeleton'
import { ColumnGroup } from '@shared/ui/form-fields'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card'

type Props = {
    rowCount?: number
}

export function CardSkeleton({ rowCount = 10 }: Props) {
    const rows = Array.from({ length: rowCount }, (_, index) => index + 1)
    return (
        <Card className="container">
            <CardHeader className="flex flex-col lg:flex-row justify-between gap-2">
                <CardTitle>
                    <Skeleton className="h-8 w-[300px]" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {rows.map((_, index) => (
                    <ColumnGroup key={index}>
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </ColumnGroup>
                ))}
            </CardContent>
        </Card>
    )
}
