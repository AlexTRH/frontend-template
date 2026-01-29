import { Dot } from 'lucide-react'
import { Skeleton } from '@shared/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/ui/card'

type Props = {
    rowCount?: number
}

export function LogsSkeleton({ rowCount = 10 }: Props) {
    const rows = Array.from({ length: rowCount }, (_, index) => index + 1)
    return (
        <Card className="container mt-8">
            <CardHeader className="border-b">
                <CardTitle>
                    <Skeleton className="h-9.5 w-[120px]" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {rows.map((_, index) => (
                        <li key={index} className="flex gap-x-4">
                            <div className="flex items-center gap-4 w-4/5 h-5">
                                <Dot className="size-4 shrink-0 text-secondary-foreground" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                            <Skeleton className="h-5 w-1/5" />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-9 w-full" />
            </CardFooter>
        </Card>
    )
}
