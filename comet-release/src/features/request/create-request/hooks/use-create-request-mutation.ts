import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import { QUERY_KEYS } from '@shared/constants'
import type { RequestFormData } from '@entities/request'

import { createRequest } from '../api'

export const useCreateRequestMutation = () => {
    const queryClient = useQueryClient()
    const { mutate, isError, isPending, isSuccess } = useMutation<unknown, DefaultError, RequestFormData>({
        mutationFn: createRequest,
        onSuccess: () => {
            toast.success('The request was successfully created')
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] }),
    })
    return { mutate, isError, isPending, isSuccess }
}
