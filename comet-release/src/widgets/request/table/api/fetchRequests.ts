import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import { customFetchJson } from '@shared/lib/fetch'
import type { Request } from '@entities/request'

export const fetchRequests = async (queryParams: QueryParamsPayload): Promise<ResponseList<'requests', Request>> => {
    return await customFetchJson('/v1/requests', { queryParams })
}
