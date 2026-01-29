import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryParamsPayload } from '@shared/types/api'
import { QUERY_KEYS } from '@shared/constants'

import { fetchCandidates } from '../api/fetchCandidates'

export const useFetchCandidatesQuery = (params: QueryParamsPayload) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.PERSONS, params],
        queryFn: () => fetchCandidates(params),
        placeholderData: keepPreviousData,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
