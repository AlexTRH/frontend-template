import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Item } from '@entities/item'
import { ITEMS_QUERY_KEY, deleteItem } from '@entities/item'

export function useDeleteItemMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteItem,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ITEMS_QUERY_KEY })
            const previous = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY)
            queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) => (old ?? []).filter((i) => i.id !== id))
            return { previous }
        },
        onError: (_err, _id, context) => {
            if (context?.previous != null) {
                queryClient.setQueryData(ITEMS_QUERY_KEY, context.previous)
            }
            toast.error('Failed to delete')
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
            toast.success('Item deleted')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
        },
    })
}
