import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationQueryParams, UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'
import { parseLogs } from '@entities/logs'
import { useDecodeIdToken } from '@entities/auth/hooks'

import { formatRequestValue } from '../lib'
import { getRequestLogs } from '../api'

export const useFetchRequestLogsQuery = ({ request_uuid, limit }: { request_uuid: UuId } & PaginationQueryParams) => {
    const me = useDecodeIdToken()
    const { data, isPending, error } = useQuery({
        queryKey: [QUERY_KEYS.REQUEST_LOGS, request_uuid, limit],
        queryFn: () => getRequestLogs({ request_uuid, limit }),
        placeholderData: keepPreviousData,
        select: ({ total, logs }) => ({
            logs: parseLogs({ type: 'request', formatFn: formatRequestValue, myEmail: me!.email, logs }),
            total,
            count: logs.length,
        }),
    })
    return { data, isPending, error }
}
