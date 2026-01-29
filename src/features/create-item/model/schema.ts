import { z } from 'zod'

export const createItemSchema = z.object({
    title: z.string().min(1, 'Required').max(100),
})

export type CreateItemFormValue = z.infer<typeof createItemSchema>
