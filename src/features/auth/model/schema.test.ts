import { describe, expect, it } from 'vitest'

import { getLoginSchema } from './schema'

const mockT = (key: string, opts?: { count?: number }) => (opts?.count != null ? `${key}:${opts.count}` : key)
describe('getLoginSchema', () => {
    it('accepts valid email and password', () => {
        const schema = getLoginSchema(mockT)
        const result = schema.safeParse({ email: 'user@example.com', password: '123456' })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.email).toBe('user@example.com')
            expect(result.data.password).toBe('123456')
        }
    })

    it('rejects empty email', () => {
        const schema = getLoginSchema(mockT)
        const result = schema.safeParse({ email: '', password: '123456' })
        expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
        const schema = getLoginSchema(mockT)
        const result = schema.safeParse({ email: 'not-an-email', password: '123456' })
        expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
        const schema = getLoginSchema(mockT)
        const result = schema.safeParse({ email: 'a@b.com', password: '12345' })
        expect(result.success).toBe(false)
    })

    it('rejects empty password', () => {
        const schema = getLoginSchema(mockT)
        const result = schema.safeParse({ email: 'a@b.com', password: '' })
        expect(result.success).toBe(false)
    })
})
