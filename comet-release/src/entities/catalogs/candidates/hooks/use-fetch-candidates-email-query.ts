import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { WithDisabled } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchCandidatesEmail } from '../api'

export const useFetchCandidatesEmailQuery = ({ search, disabled }: { search?: string } & WithDisabled) => {
    const { isFetching, isPending, isPlaceholderData, data, error } = useQuery({
        queryKey: [QUERY_KEYS.PERSONS, { search }],
        queryFn: () => fetchCandidatesEmail({ search }),
        select: (data) => data['persons'].map((email) => ({ uuid: email, title: email })),
        placeholderData: keepPreviousData,
        enabled: !disabled,
        staleTime: 1000 * 60 * 5,
    })
    return { isFetching, isPending, data, error, isPlaceholderData }
}
