import type { Dispatch, SetStateAction } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@shared/ui/sheet'
import { Error } from '@shared/ui/errors'
import { Button } from '@shared/ui/button'
import type { ResponseList } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants'
import { LogsSkeleton } from '@entities/logs/ui/logs-skeleton'
import type { Log } from '@entities/logs'

import { LogsList } from './logs-list'

type Props = {
    data?: ResponseList<'logs', Log> & { count: number }
    open: boolean
    onOpenChange: (value: boolean) => void
    isPending: boolean
    error: Error | null
    setLimit: Dispatch<SetStateAction<number>>
}
export function LogsSheet({ open, onOpenChange, data, isPending, error, setLimit }: Props) {
    const hasMoreLogs = data && data.count < data.total
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild hidden>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg overflow-y-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle>Activity</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                    {isPending && <LogsSkeleton />}
                    {data && <LogsList logs={data.logs} />}
                    {error && <Error title="Failed to load activities" description={error.message} />}
                </div>
                <SheetFooter>
                    {hasMoreLogs && (
                        <Button
                            variant="border"
                            className="w-full"
                            onClick={() => setLimit((prev: number) => prev + DEFAULT_PAGINATION_LIMIT)}
                        >
                            Show more activity
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
