import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import { fetchRequestByID } from '../api'
export const useFetchRequestQuery = (request_id: string) => {
    const { error, data, isPending } = useQuery({
        queryKey: [QUERY_KEYS.REQUESTS, { request_id }],
        queryFn: () => fetchRequestByID(request_id),
        placeholderData: keepPreviousData,
    })
    return { error, data, isPending }
}
