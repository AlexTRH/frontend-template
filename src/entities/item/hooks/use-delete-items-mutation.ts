import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Item } from '@entities/item'
import { ITEMS_QUERY_KEY, deleteItems } from '@entities/item'

export function useDeleteItemsMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteItems,
        onMutate: async (ids) => {
            await queryClient.cancelQueries({ queryKey: ITEMS_QUERY_KEY })
            const previous = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY)
            const idSet = new Set(ids)
            queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) => (old ?? []).filter((i) => !idSet.has(i.id)))
            return { previous }
        },
        onError: (_err, _ids, context) => {
            if (context?.previous != null) {
                queryClient.setQueryData(ITEMS_QUERY_KEY, context.previous)
            }
            toast.error('Failed to delete')
        },
        onSuccess: (_data, ids) => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
            toast.success(ids.length === 1 ? 'Item deleted' : `${ids.length} items deleted`)
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
        },
    })
}
