import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryParamsPayload } from '@shared/types/api'
import { QUERY_KEYS } from '@shared/constants'

import { fetchRequests } from '../api'

export const useFetchRequestsQuery = (params: QueryParamsPayload) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.REQUESTS, params],
        queryFn: () => fetchRequests(params),
        placeholderData: keepPreviousData,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
