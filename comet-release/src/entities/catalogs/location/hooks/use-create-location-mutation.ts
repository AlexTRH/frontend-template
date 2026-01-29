import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import { createLocation } from '../api'

export const useCreateLocationMutation = ({ onMutate }: { onMutate: (title: string) => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, data } = useMutation({
        mutationFn: createLocation,
        onMutate: onMutate,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOCATIONS] })
        },
    })
    return { mutate, isPending, data }
}
