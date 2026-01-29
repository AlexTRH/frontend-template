import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { FeedbackFormValue } from '../model/types'
import { addInterviewFeedback } from '../api'

type Props = {
    request_id: UuId
    position_id: UuId
    interview_id: UuId
}

export const useAddFeedbackMutation = ({ interview_id, position_id, request_id }: Props) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<UuId, DefaultError, FeedbackFormValue>({
        mutationFn: (data) => addInterviewFeedback({ interview_id, position_id, request_id }, data),
        onSuccess: () => {
            toast.success('Feedback has been sent')
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] }),
    })
    return { mutate, isPending }
}
