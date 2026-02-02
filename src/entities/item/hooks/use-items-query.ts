import { useQuery } from '@tanstack/react-query'

import { fetchItems, ITEMS_QUERY_KEY } from '../api'

type UseItemsQueryOptions = {
    refetchInterval?: number
}

export function useItemsQuery(options?: UseItemsQueryOptions) {
    return useQuery({
        queryKey: ITEMS_QUERY_KEY,
        queryFn: fetchItems,
        refetchInterval: options?.refetchInterval,
    })
}
