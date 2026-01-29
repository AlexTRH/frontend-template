import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

import type { CreatedInterviewData } from '../model/types'

export const createInterviewStage = ({
    request_id,
    position_id,
    body,
}: {
    request_id: UuId
    position_id: UuId
    body: CreatedInterviewData
}): Promise<UuId> => {
    return customFetchJson(`/v1/requests/${request_id}/positions/${position_id}/interviews`, { method: 'POST', body })
}

export const editInterviewStage = ({
    request_id,
    position_id,
    interview_id,
    body,
}: {
    request_id: UuId
    position_id: UuId
    interview_id: UuId
    body: Partial<CreatedInterviewData>
}): Promise<void> => {
    return customFetchJson(`/v1/requests/${request_id}/positions/${position_id}/interviews/${interview_id}`, {
        method: 'PATCH',
        body,
    })
}

export const deleteInterviewStage = ({
    request_id,
    position_id,
    interview_id,
}: {
    request_id: UuId
    position_id: UuId
    interview_id: UuId
}): Promise<void> => {
    return customFetchJson(`/v1/requests/${request_id}/positions/${position_id}/interviews/${interview_id}`, {
        method: 'DELETE',
    })
}
