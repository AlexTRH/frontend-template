import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { ClosedRequestData } from '../model'
import { closeRequest } from '../api'

export const useCloseRequestMutation = (request_uuid: UuId) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<string, DefaultError, ClosedRequestData>({
        mutationFn: (body) => closeRequest({ request_uuid, body }),
        onSuccess: () => {
            toast.success('The request was closed')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] })
        },
    })
    return { mutate, isPending }
}
