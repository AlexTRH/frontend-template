import { apiClient } from '@shared/api'
import type { Item } from '@entities/item'

import type { CreateItemFormValue } from '../model'

export async function createItem(payload: CreateItemFormValue): Promise<Item> {
    const { data } = await apiClient.post<Item>('/items', payload)
    return data
}
