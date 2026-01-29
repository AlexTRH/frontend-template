import type { ResponseList } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import { customFetchJson } from '@shared/lib/fetch'
import type { Position } from '@entities/position'

export const fetchAllPositions = async (
    queryParams: QueryParamsPayload
): Promise<ResponseList<'positions', Position>> => {
    return await customFetchJson('/v1/positions', { queryParams })
}
