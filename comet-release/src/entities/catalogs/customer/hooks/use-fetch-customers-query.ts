import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { WithDisabled } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchCustomers } from '../api/index'

export const useFetchCustomersQuery = ({ search, disabled }: { search?: string } & WithDisabled) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.CUSTOMERS, { search }],
        queryFn: () => fetchCustomers({ search }),
        select: (data) => data['customers'],
        placeholderData: keepPreviousData,
        enabled: !disabled,
        staleTime: 1000 * 60 * 5,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
