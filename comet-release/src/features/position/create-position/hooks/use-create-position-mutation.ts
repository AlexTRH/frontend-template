import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import { QUERY_KEYS } from '@shared/constants'

import type { CreatedPositionData } from '../model'
import { createPosition } from '../api'

export const useCreatePositionMutation = () => {
    const queryClient = useQueryClient()
    const { mutate, isError, isPending, isSuccess } = useMutation<null, DefaultError, CreatedPositionData>({
        mutationFn: createPosition,
        onSuccess: () => {
            toast.success('The request position was successfully created')
        },
        onSettled: (_, _error, data) => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSITIONS] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS, { request_id: data.request_id }] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST_LOGS, data.request_id] })
        },
    })
    return { mutate, isError, isPending, isSuccess }
}
