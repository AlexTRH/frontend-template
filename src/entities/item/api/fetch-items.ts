import { apiClient } from '@shared/api'

import type { Item } from '../model'

export const ITEMS_QUERY_KEY = ['items'] as const

export async function fetchItems(): Promise<Item[]> {
    try {
        const { data } = await apiClient.get<Item[]>('/items')
        return (data ?? []).map(normalizeItem)
    } catch {
        return []
    }
}

function normalizeItem(row: Partial<Item> & { id: string; title: string }): Item {
    return {
        id: row.id,
        title: row.title,
        status: row.status ?? 'active',
        createdAt: row.createdAt ?? new Date().toISOString(),
    }
}
