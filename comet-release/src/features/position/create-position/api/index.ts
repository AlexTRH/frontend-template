import { customFetchJson } from '@shared/lib/fetch'

import type { CreatedPositionData } from '../model'

export const createPosition = async (body: CreatedPositionData) => {
    return await customFetchJson<CreatedPositionData, null>('/v1/positions/create-request-position', {
        method: 'POST',
        body,
    })
}
