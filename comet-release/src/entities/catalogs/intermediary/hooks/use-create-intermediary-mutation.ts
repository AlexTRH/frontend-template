import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import { createIntermediary } from '../api'

export const useCreateIntermediaryMutation = ({ onMutate }: { onMutate: (title: string) => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, data } = useMutation({
        mutationFn: (customer) => createIntermediary(customer),
        onMutate: onMutate,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERMEDIARIES] })
        },
    })
    return { mutate, isPending, data }
}
