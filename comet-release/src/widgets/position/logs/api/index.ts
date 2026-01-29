import type { PaginationQueryParams, ResponseList, UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import { DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

import type { PositionLog } from '../model'

export const getPositionLogs = async ({
    request_uuid,
    position_uuid,
    limit,
    offset = DEFAULT_PAGINATION_OFFSET,
}: { request_uuid: UuId; position_uuid: UuId } & PaginationQueryParams): Promise<ResponseList<'logs', PositionLog>> => {
    return await customFetchJson(`/v1/requests/${request_uuid}/positions/${position_uuid}/logs`, {
        queryParams: { limit, offset },
    })
}
