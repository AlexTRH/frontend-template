import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ITEMS_QUERY_KEY } from '@entities/item'

import { createItem } from '../api'

export function useCreateItemMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
            toast.success('Item created')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
}
