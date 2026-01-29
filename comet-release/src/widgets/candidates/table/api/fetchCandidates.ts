import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import { customFetchJson } from '@shared/lib/fetch'
import type { Candidate } from '@entities/candidate'

export const fetchCandidates = async (queryParams: QueryParamsPayload): Promise<ResponseList<'persons', Candidate>> => {
    return await customFetchJson('/v1/persons', { queryParams, pulsar: true })
}
