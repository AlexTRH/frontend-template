import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import type { RequestFormData } from '@entities/request'

export const createRequest = async (body: RequestFormData) => {
    return await customFetchJson<RequestFormData, UuId>('/v1/requests', {
        method: 'POST',
        body,
    })
}
