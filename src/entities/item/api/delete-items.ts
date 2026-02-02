import { apiClient } from '@shared/api'

/** Delete multiple items (sequential requests). For bulk delete endpoint use a single API call. */
export async function deleteItems(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => apiClient.delete(`/items/${id}`)))
}
