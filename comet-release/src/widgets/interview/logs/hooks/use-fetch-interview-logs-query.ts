import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationQueryParams, UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'
import { parseLogs } from '@entities/logs'
import { useDecodeIdToken } from '@entities/auth/hooks'

import { formatInterviewValue } from '../lib'
import { getInterviewLogs } from '../api'

export const useFetchInterviewLogsQuery = ({
    interview_uuid,
    request_uuid,
    position_uuid,
    open,
    limit,
}: { interview_uuid: UuId; request_uuid: UuId; position_uuid: UuId; open: boolean } & PaginationQueryParams) => {
    const me = useDecodeIdToken()
    const { data, isPending, isLoading, error } = useQuery({
        queryKey: [
            QUERY_KEYS.INTERVIEW_LOGS,
            {
                interview_uuid,
                limit,
            },
        ],
        queryFn: () => getInterviewLogs({ interview_uuid, request_uuid, position_uuid, limit }),
        placeholderData: keepPreviousData,
        enabled: open,
        select: ({ total, logs }) => ({
            total,
            logs: parseLogs({ type: 'interview', formatFn: formatInterviewValue, myEmail: me!.email, logs }),
            count: logs.length,
        }),
    })
    return { data, isPending, isLoading, error }
}
