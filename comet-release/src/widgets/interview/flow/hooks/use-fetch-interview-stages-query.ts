import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryParamsPayload } from '@shared/types/api'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchInterviewsByPositionId } from '../api'

export const useFetchInterviewStagesQuery = ({
    request_id,
    position_id,
    queryParams,
}: {
    request_id: UuId
    position_id: UuId
    queryParams?: QueryParamsPayload
}) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.INTERVIEWS],
        queryFn: () => fetchInterviewsByPositionId({ request_id, position_id, queryParams }),
        placeholderData: keepPreviousData,
        select: (data) => data.interviews,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
