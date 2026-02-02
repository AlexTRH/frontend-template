import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Item } from '@entities/item'
import { ITEMS_QUERY_KEY } from '@entities/item'

import { createItem } from '../api'

export function useCreateItemMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onMutate: async (newItem) => {
            await queryClient.cancelQueries({ queryKey: ITEMS_QUERY_KEY })
            const previous = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY)
            const optimistic: Item = {
                id: `temp-${Date.now()}`,
                title: newItem.title,
                status: newItem.status,
                createdAt: new Date().toISOString(),
            }
            queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) => [...(old ?? []), optimistic])
            return { previous }
        },
        onError: (err, _variables, context) => {
            if (context?.previous != null) {
                queryClient.setQueryData(ITEMS_QUERY_KEY, context.previous)
            }
            toast.error(err.message)
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
            toast.success('Item created')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
        },
    })
}
