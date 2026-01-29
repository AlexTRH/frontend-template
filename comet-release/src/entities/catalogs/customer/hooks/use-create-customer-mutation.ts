import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import { createCustomer } from '../api'

export const useCreateCustomerMutation = ({ onMutate }: { onMutate: (title: string) => void }) => {
    const queryClient = useQueryClient()
    const { mutate, data, isPending } = useMutation({
        mutationFn: createCustomer,
        onMutate: onMutate,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CUSTOMERS] })
        },
    })
    return { mutate, isPending, data }
}
