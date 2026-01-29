import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import type { InterviewStage } from '@entities/interview/stage'

export const fetchInterviewsByPositionId = ({
    request_id,
    position_id,
    queryParams,
}: {
    request_id: UuId
    position_id: UuId
    queryParams?: QueryParamsPayload
}): Promise<ResponseList<'interviews', InterviewStage>> => {
    return customFetchJson(`/v1/requests/${request_id}/positions/${position_id}/interviews`, {
        queryParams,
    })
}
