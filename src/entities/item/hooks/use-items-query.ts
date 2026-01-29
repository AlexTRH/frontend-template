import { useQuery } from '@tanstack/react-query'

import { fetchItems, ITEMS_QUERY_KEY } from '../api'

export function useItemsQuery() {
    return useQuery({
        queryKey: ITEMS_QUERY_KEY,
        queryFn: fetchItems,
    })
}
