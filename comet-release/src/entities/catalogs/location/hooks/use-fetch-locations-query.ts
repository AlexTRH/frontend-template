import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { WithDisabled } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchLocations } from '../api'

export const useFetchLocationsQuery = ({ search, disabled }: { search?: string } & WithDisabled) => {
    const { data, error, isPending, isFetching, isPlaceholderData } = useQuery({
        queryKey: [QUERY_KEYS.LOCATIONS, { search }],
        queryFn: () => fetchLocations({ search }),
        select: (data) => data['locations'],
        placeholderData: keepPreviousData,
        enabled: !disabled,
        staleTime: 1000 * 60 * 5,
    })
    return { data, error, isPending, isFetching, isPlaceholderData }
}
