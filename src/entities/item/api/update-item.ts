import { apiClient } from '@shared/api'
import type { Item, ItemPayload } from '@entities/item'

export async function updateItem(id: string, payload: ItemPayload): Promise<Item> {
    const { data } = await apiClient.put<Item>(`/items/${id}`, payload)
    return data
}
