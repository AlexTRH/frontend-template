import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { CreatedInterviewData } from '../model/types'
import { editInterviewStage } from '../api'

export const useEditInterviewStageMutation = ({ request_id, position_id }: { request_id: UuId; position_id: UuId }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<
        void,
        DefaultError,
        { interview_id: UuId; body: Partial<CreatedInterviewData> }
    >({
        mutationFn: ({ interview_id, body }) => editInterviewStage({ request_id, position_id, interview_id, body }),
        onSuccess: () => {
            toast.success('Changes saved')
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] }),
    })
    return { mutateWhenEdit: mutate, isPendingWhenEdit: isPending }
}
