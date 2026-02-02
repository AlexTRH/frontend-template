import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Item, ItemPayload } from '@entities/item'
import { ITEMS_QUERY_KEY, updateItem } from '@entities/item'

export function useUpdateItemMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: ItemPayload }) => updateItem(id, payload),
        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: ITEMS_QUERY_KEY })
            const previous = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY)
            queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) =>
                (old ?? []).map((item) =>
                    item.id === id ? { ...item, title: payload.title, status: payload.status } : item
                )
            )
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
            toast.success('Item updated')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
        },
    })
}
