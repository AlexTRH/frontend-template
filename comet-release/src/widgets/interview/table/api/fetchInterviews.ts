import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import { customFetchJson } from '@shared/lib/fetch'
import type { InterviewStage } from '@entities/interview/stage'

export const fetchInterviews = async (
    queryParams: QueryParamsPayload
): Promise<ResponseList<'interviews', InterviewStage>> => {
    return await customFetchJson('/v1/interviews', { queryParams })
}
