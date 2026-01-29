import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationQueryParams, UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'
import { parseLogs } from '@entities/logs'
import { useDecodeIdToken } from '@entities/auth/hooks'

import { formatPositionValue } from '../lib'
import { getPositionLogs } from '../api'

export const useFetchPositionLogsQuery = ({
    request_uuid,
    position_uuid,
    open,
    limit,
}: { request_uuid: UuId; position_uuid: UuId; open: boolean } & PaginationQueryParams) => {
    const me = useDecodeIdToken()
    const { data, isPending, isLoading, error } = useQuery({
        queryKey: [
            QUERY_KEYS.POSITION_LOGS,
            {
                position_uuid,
                limit,
            },
        ],
        queryFn: () => getPositionLogs({ request_uuid, position_uuid, limit }),
        placeholderData: keepPreviousData,
        enabled: open,
        select: ({ total, logs }) => ({
            total,
            logs: parseLogs({ type: 'position', formatFn: formatPositionValue, myEmail: me!.email, logs }),
            count: logs.length,
        }),
    })
    return { data, isPending, isLoading, error }
}
