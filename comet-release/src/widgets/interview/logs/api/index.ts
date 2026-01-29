import type { PaginationQueryParams, ResponseList, UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import { DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

import type { InterviewStageLog } from '../model'

export const getInterviewLogs = async ({
    interview_uuid,
    request_uuid,
    position_uuid,
    limit,
    offset = DEFAULT_PAGINATION_OFFSET,
}: {
    interview_uuid: UuId
    request_uuid: UuId
    position_uuid: UuId
} & PaginationQueryParams): Promise<ResponseList<'logs', InterviewStageLog>> => {
    return await customFetchJson(
        `/v1/requests/${request_uuid}/positions/${position_uuid}/interviews/${interview_uuid}/logs`,
        {
            queryParams: { limit, offset },
        }
    )
}
