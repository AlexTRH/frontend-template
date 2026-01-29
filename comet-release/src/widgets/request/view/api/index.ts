import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import type { RequestFormData } from '@entities/request'

export const editRequest = async ({ request_id, body }: { request_id: UuId; body: Partial<RequestFormData> }) => {
    return await customFetchJson<Partial<RequestFormData>, void>(`/v1/requests/${request_id}`, {
        method: 'PATCH',
        body,
    })
}
