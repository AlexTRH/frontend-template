import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import type { Position } from '@entities/position'

export const fetchPositionsByRequestId = async (
    request_id: UuId,
    queryParams: QueryParamsPayload
): Promise<ResponseList<'positions', Position>> => {
    return await customFetchJson(`/v1/requests/${request_id}/positions`, { queryParams })
}
