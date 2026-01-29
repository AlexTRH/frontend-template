import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

import type { FeedbackFormValue } from '../model/types'

export const addInterviewFeedback = async (
    {
        request_id,
        interview_id,
        position_id,
    }: {
        request_id: UuId
        position_id: UuId
        interview_id: UuId
    },
    data: FeedbackFormValue
): Promise<UuId> => {
    return await customFetchJson(
        `/v1/requests/${request_id}/positions/${position_id}/interviews/${interview_id}/feedbacks`,
        { method: 'POST', body: data }
    )
}
