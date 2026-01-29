import * as yup from 'yup'
import type { Language } from '@shared/constants'
import { VALIDATION } from '@shared/constants'

const catalogItemSchema = yup.object({
    uuid: yup.string().required(),
    title: yup.string().required(),
})
export const createPositionSchema = yup.object({
    candidates: yup
        .array()
        .of(catalogItemSchema)
        .ensure()
        .required(VALIDATION.REQUIRED_FIELD)
        .min(1, VALIDATION.REQUIRED_FIELD),
    is_default: yup.string<'true' | 'false'>().required(VALIDATION.REQUIRED_FIELD),
    language: yup.string<Language>().required(VALIDATION.REQUIRED_FIELD),
})
