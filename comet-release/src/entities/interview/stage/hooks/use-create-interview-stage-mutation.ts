import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { CreatedInterviewData } from '../model/types'
import { createInterviewStage } from '../api'

export const useCreateInterviewStageMutation = ({
    request_id,
    position_id,
}: {
    request_id: UuId
    position_id: UuId
}) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<UuId, DefaultError, CreatedInterviewData>({
        mutationFn: (body) => createInterviewStage({ request_id, position_id, body }),
        onSuccess: () => {
            toast.success('Created successfully')
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] })
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSITIONS, position_id] })
        },
    })
    return { mutateWhenCreate: mutate, isPendingWhenCreate: isPending }
}
