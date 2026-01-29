import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryParamsPayload } from '@shared/types/api'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchPositionsByRequestId } from '../api/fetchPositionsByRequestId'
import { fetchAllPositions } from '../api/fetchAllPositions'

export const useFetchPositionsByRequestIdQuery = ({
    request_id,
    params,
}: {
    request_id?: UuId
    params: QueryParamsPayload
}) => {
    const { isPending, data, error } = useQuery({
        queryKey: [QUERY_KEYS.POSITIONS, params],
        queryFn: () => (request_id ? fetchPositionsByRequestId(request_id, params) : fetchAllPositions(params)),
        placeholderData: keepPreviousData,
    })

    return { isPending, data, error }
}
