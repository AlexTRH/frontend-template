import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryParamsPayload } from '@shared/types/api'
import { QUERY_KEYS } from '@shared/constants'

import { fetchInterviews } from '../api/fetchInterviews'

export const useFetchInterviewsQuery = (params: QueryParamsPayload) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.INTERVIEWS, params],
        queryFn: () => fetchInterviews(params),
        placeholderData: keepPreviousData,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
