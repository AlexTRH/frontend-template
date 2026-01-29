import type { Dispatch, SetStateAction } from 'react'
import { Error } from '@shared/ui/errors'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import type { ResponseList } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants'
import { LogsSkeleton } from '@entities/logs/ui/logs-skeleton'
import type { Log } from '@entities/logs'

import { LogsList } from './logs-list'

type Props = {
    data?: ResponseList<'logs', Log> & { count: number }
    isPending: boolean
    error: Error | null
    setLimit: Dispatch<SetStateAction<number>>
}
export function LogsCard({ data, isPending, error, setLimit }: Props) {
    const hasMoreLogs = data && data.count < data.total
    return (
        <Card className="container mt-8">
            <CardHeader className="border-b">
                <CardTitle className="text-3xl">Activity</CardTitle>
            </CardHeader>
            <CardContent>
                {isPending && <LogsSkeleton />}
                {data && <LogsList logs={data.logs} />}
                {error && <Error title="Failed to load activities" description={error.message} />}
            </CardContent>
            <CardFooter>
                {hasMoreLogs && (
                    <Button
                        variant="border"
                        className="w-full"
                        onClick={() => setLimit((prev) => prev + DEFAULT_PAGINATION_LIMIT)}
                    >
                        Show more activity
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
