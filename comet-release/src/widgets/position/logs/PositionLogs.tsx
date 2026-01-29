import { useState } from 'react'
import type { UuId } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants'
import { LogsSheet } from '@entities/logs'

import { useFetchPositionLogsQuery } from './hooks'

type Props = {
    request_uuid: UuId
    position_uuid: UuId
    open: boolean
    onOpenChange: (value: boolean) => void
}
export function PositionLogs({ request_uuid, position_uuid, open, onOpenChange }: Props) {
    const [limit, setLimit] = useState<number>(DEFAULT_PAGINATION_LIMIT)
    const { data, error, isPending } = useFetchPositionLogsQuery({ request_uuid, position_uuid, limit, open })
    return (
        <LogsSheet
            data={data}
            open={open}
            onOpenChange={onOpenChange}
            isPending={isPending}
            error={error}
            setLimit={setLimit}
        />
    )
}
