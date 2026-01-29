import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import type { Position } from '@entities/position'

export const fetchPositionByID = async ({
    request_id,
    position_id,
}: {
    request_id: UuId
    position_id: UuId
}): Promise<Position> => {
    return await customFetchJson(`/v1/requests/${request_id}/positions/${position_id}`)
}
