import { customFetchJson } from '@shared/lib/fetch'
import type { Request } from '@entities/request'

export const fetchRequestByID = async (id: string): Promise<Request> => {
    return await customFetchJson(`/v1/requests/${id}`)
}
