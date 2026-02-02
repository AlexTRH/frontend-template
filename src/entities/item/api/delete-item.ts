import { apiClient } from '@shared/api'

export async function deleteItem(id: string): Promise<void> {
    await apiClient.delete(`/items/${id}`)
}
