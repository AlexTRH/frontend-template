import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { ClosedPositionData } from '../model/types'
import { closePosition } from '../api'

export const useClosePositionMutation = (request_uuid: UuId, request_positions_id: UuId) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<void, DefaultError, ClosedPositionData>({
        mutationFn: (body) => closePosition({ request_uuid, request_positions_id, body }),
        onSuccess: () => {
            toast.success('The request position was closed')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSITIONS, request_positions_id] })
        },
    })
    return { mutate, isPending }
}
