// Custom fetch wrapper to parse JSON responses
import type { FetchPayloadType } from './customFetch'
import { customFetch } from './customFetch'

export const customFetchJson = async <TRequestBody = object, TResponseBody = object>(
    url: string,
    payload: FetchPayloadType<TRequestBody> = { method: 'GET' }
): Promise<TResponseBody> => {
    const response = await customFetch<TRequestBody>(url, payload)
    return response.json() as Promise<TResponseBody>
}
