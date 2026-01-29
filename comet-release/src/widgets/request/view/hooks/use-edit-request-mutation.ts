import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'
import type { RequestFormData } from '@entities/request'

import { editRequest } from '../api'

export const useEditRequestMutation = (request_id: UuId) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<void, DefaultError, Partial<RequestFormData>>({
        mutationFn: (body) => editRequest({ request_id, body }),
        onSuccess: () => {
            toast.success('Changes saved')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS, { request_id }] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST_LOGS, request_id] })
        },
    })
    return { mutate, isPending }
}
