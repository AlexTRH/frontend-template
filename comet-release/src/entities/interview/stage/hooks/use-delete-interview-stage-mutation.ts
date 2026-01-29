import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { deleteInterviewStage } from '../api'

export const useDeleteInterviewStageMutation = ({
    request_id,
    position_id,
}: {
    request_id: UuId
    position_id: UuId
}) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<void, DefaultError, UuId>({
        mutationFn: (interview_id) => deleteInterviewStage({ request_id, position_id, interview_id }),
        onSuccess: () => {
            toast.success('Stage removed')
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] })
        },
    })
    return { mutateWhenDelete: mutate, isPendingWhenDelete: isPending }
}
