import type * as yup from 'yup'
import type { Email, UuId } from '@shared/types'
import type { Language } from '@shared/constants'

import type { createPositionSchema } from './schema'

export type CreatedPositionData = {
    request_id: UuId
    candidates: Email[]
    is_default: boolean
    language: Language
}

export type CreatedPositionFormValue = yup.InferType<typeof createPositionSchema>
