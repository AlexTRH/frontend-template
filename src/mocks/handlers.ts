import { http, HttpResponse } from 'msw'
import type { User } from '@entities/user'
import type { Item } from '@entities/item'

const store: Item[] = [
    { id: '1', title: 'Marketing campaign Q1', status: 'active', createdAt: '2025-01-15T10:00:00.000Z' },
    { id: '2', title: 'Product roadmap 2025', status: 'active', createdAt: '2025-01-10T14:30:00.000Z' },
    { id: '3', title: 'User research summary', status: 'draft', createdAt: '2025-01-08T09:00:00.000Z' },
    { id: '4', title: 'API integration guide', status: 'archived', createdAt: '2024-12-20T16:00:00.000Z' },
    { id: '5', title: 'Design system v2', status: 'active', createdAt: '2025-01-12T11:00:00.000Z' },
]

export const handlers = [
    http.get('/api/items', () => {
        return HttpResponse.json(store)
    }),
    http.post('/api/items', async ({ request }: { request: Request }) => {
        const body = (await request.json()) as { title: string; status?: Item['status'] }
        const newItem: Item = {
            id: crypto.randomUUID(),
            title: body.title ?? '',
            status: body.status ?? 'active',
            createdAt: new Date().toISOString(),
        }
        store.push(newItem)
        return HttpResponse.json(newItem)
    }),
    http.post('/api/auth/login', async ({ request }: { request: Request }) => {
        const body = (await request.json()) as { email: string; password: string }
        if (!body.email || !body.password) {
            return HttpResponse.json({ message: 'Email and password required' }, { status: 400 })
        }
        if (body.password.length < 6) {
            return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
        }
        const user: User = {
            id: crypto.randomUUID(),
            email: body.email,
            name: body.email.split('@')[0] ?? 'User',
        }
        const token = `mock-jwt-${crypto.randomUUID()}`
        return HttpResponse.json({ user, token })
    }),
]
