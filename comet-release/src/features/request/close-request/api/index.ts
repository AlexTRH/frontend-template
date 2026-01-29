import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

import type { ClosedRequestData } from '../model'

export const closeRequest = async ({
    request_uuid,
    body,
}: {
    request_uuid: UuId
    body: ClosedRequestData
}): Promise<string> => {
    return await customFetchJson(`/v1/requests/${request_uuid}/close`, {
        method: 'POST',
        body,
    })
}
