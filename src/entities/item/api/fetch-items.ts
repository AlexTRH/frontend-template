import { QUERY_KEYS } from '@shared/constants'
import { apiClient } from '@shared/api'

import type { Item } from '../model'

export const ITEMS_QUERY_KEY = [QUERY_KEYS.ITEMS] as const

// В dev при пустом ответе или ошибке API показываем демо-айтемы, чтобы таблица не была пустой без MSW/бэкенда.
const DEV_SEED_ITEMS: Item[] = [
    { id: '1', title: 'Marketing campaign Q1', status: 'active', createdAt: '2025-01-15T10:00:00.000Z' },
    { id: '2', title: 'Product roadmap 2025', status: 'active', createdAt: '2025-01-10T14:30:00.000Z' },
    { id: '3', title: 'User research summary', status: 'draft', createdAt: '2025-01-08T09:00:00.000Z' },
    { id: '4', title: 'API integration guide', status: 'archived', createdAt: '2024-12-20T16:00:00.000Z' },
    { id: '5', title: 'Design system v2', status: 'active', createdAt: '2025-01-12T11:00:00.000Z' },
    { id: '6', title: 'Onboarding flow wireframes', status: 'draft', createdAt: '2025-01-07T08:00:00.000Z' },
    { id: '7', title: 'Q4 analytics report', status: 'archived', createdAt: '2024-12-15T12:00:00.000Z' },
    { id: '8', title: 'Mobile app prototype', status: 'active', createdAt: '2025-01-14T09:30:00.000Z' },
    { id: '9', title: 'Backend migration plan', status: 'draft', createdAt: '2025-01-05T14:00:00.000Z' },
    { id: '10', title: 'Customer feedback digest', status: 'active', createdAt: '2025-01-11T16:45:00.000Z' },
]

export async function fetchItems(): Promise<Item[]> {
    try {
        const { data } = await apiClient.get<Item[]>('/items')
        const items = (data ?? []).map(normalizeItem)
        if (import.meta.env.DEV && items.length === 0) {
            return DEV_SEED_ITEMS
        }
        return items
    } catch {
        if (import.meta.env.DEV) return DEV_SEED_ITEMS
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
