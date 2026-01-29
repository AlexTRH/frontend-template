import { z } from 'zod'

const loginSchemaBase = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1).min(6),
})

export type LoginFormValue = z.infer<typeof loginSchemaBase>

type TFunction = (key: string, opts?: { count?: number }) => string

export function getLoginSchema(t: TFunction) {
    return z.object({
        email: z.string().min(1, t('validation.required')).email(t('validation.email')),
        password: z
            .string()
            .min(1, t('validation.required'))
            .min(6, t('validation.minLength', { count: 6 })),
    })
}

export const loginSchema = loginSchemaBase
