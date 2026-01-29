import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { WithDisabled } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchIntermediaries } from '../api/index'

export const useFetchIntermediaryQuery = ({ search, disabled }: { search?: string } & WithDisabled) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.INTERMEDIARIES, { search }],
        queryFn: () => fetchIntermediaries({ search }),
        select: (data) => data['intermediaries'],
        placeholderData: keepPreviousData,
        enabled: !disabled,
        staleTime: 1000 * 60 * 5,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
