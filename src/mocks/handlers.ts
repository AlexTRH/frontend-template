import { http, HttpResponse } from 'msw'
import type { Item } from '@entities/item'

const store: Item[] = [
    { id: '1', title: 'Example item 1' },
    { id: '2', title: 'Example item 2' },
]

export const handlers = [
    http.get('/api/items', () => {
        return HttpResponse.json(store)
    }),
    http.post('/api/items', async ({ request }: { request: Request }) => {
        const body = (await request.json()) as { title: string }
        const newItem: Item = {
            id: crypto.randomUUID(),
            title: body.title ?? '',
        }
        store.push(newItem)
        return HttpResponse.json(newItem)
    }),
]
