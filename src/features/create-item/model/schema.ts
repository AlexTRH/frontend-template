import { z } from 'zod'

const createItemSchemaBase = z.object({
    title: z.string().min(1).max(100),
})

export type CreateItemFormValue = z.infer<typeof createItemSchemaBase>

type TFunction = (key: string, opts?: { count?: number }) => string

export function getCreateItemSchema(t: TFunction) {
    return z.object({
        title: z
            .string()
            .min(1, t('validation.required'))
            .max(100, t('validation.maxLength', { count: 100 })),
    })
}

export const createItemSchema = createItemSchemaBase
