import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

import type { ClosedPositionData } from '../model/types'

export const closePosition = async ({
    request_uuid,
    request_positions_id,
    body,
}: {
    request_uuid: UuId
    request_positions_id: UuId
    body: ClosedPositionData
}): Promise<void> => {
    return await customFetchJson(`/v1/requests/${request_uuid}/positions/${request_positions_id}/close`, {
        method: 'POST',
        body,
    })
}
