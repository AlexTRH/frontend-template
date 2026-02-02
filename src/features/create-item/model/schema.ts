import { z } from 'zod'
import type { ItemStatus } from '@entities/item'

const statusEnum = z.enum(['active', 'draft', 'archived']) as z.ZodType<ItemStatus>

const createItemSchemaBase = z.object({
    title: z.string().min(1).max(100),
    status: statusEnum,
})

export type CreateItemFormValue = z.infer<typeof createItemSchemaBase>

type TFunction = (key: string, opts?: { count?: number }) => string

export function getCreateItemSchema(t: TFunction) {
    return z.object({
        title: z
            .string()
            .min(1, t('validation.required'))
            .max(100, t('validation.maxLength', { count: 100 })),
        status: statusEnum,
    })
}

export const createItemSchema = createItemSchemaBase
