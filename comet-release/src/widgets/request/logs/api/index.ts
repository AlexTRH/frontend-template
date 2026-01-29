import type { PaginationQueryParams, ResponseList, UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import { DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

import type { RequestLog } from '../model'

export const getRequestLogs = async ({
    request_uuid,
    limit,
    offset = DEFAULT_PAGINATION_OFFSET,
}: { request_uuid: UuId } & PaginationQueryParams): Promise<ResponseList<'logs', RequestLog>> => {
    return await customFetchJson(`/v1/requests/${request_uuid}/logs`, {
        queryParams: { limit, offset },
    })
}
