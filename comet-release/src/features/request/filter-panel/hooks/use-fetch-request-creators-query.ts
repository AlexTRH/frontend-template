import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import { fetchRequestCreators } from '../api'

export const useFetchRequestCreatorsQuery = () => {
    const { isFetching, isPending, data, error } = useQuery({
        queryKey: [QUERY_KEYS.CREATORS],
        queryFn: () => fetchRequestCreators(),
        placeholderData: keepPreviousData,
        select: (data) => data.creators,
    })
    return { isFetching, isPending, creators: data, error }
}
