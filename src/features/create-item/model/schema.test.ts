import { describe, expect, it } from 'vitest'

import { createItemSchema } from './schema'

describe('createItemSchema', () => {
    it('accepts valid title', () => {
        const result = createItemSchema.safeParse({ title: 'Valid item' })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.title).toBe('Valid item')
        }
    })

    it('rejects empty title', () => {
        const result = createItemSchema.safeParse({ title: '' })
        expect(result.success).toBe(false)
    })

    it('rejects title over 100 chars', () => {
        const result = createItemSchema.safeParse({ title: 'a'.repeat(101) })
        expect(result.success).toBe(false)
    })

    it('rejects missing title', () => {
        const result = createItemSchema.safeParse({})
        expect(result.success).toBe(false)
    })
})
