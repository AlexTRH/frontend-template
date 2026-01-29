import * as yup from 'yup'
import type { Verdict } from '@shared/types'
import { VALIDATION } from '@shared/constants/validation'

export const closePositionSchema = yup.object({
    comment: yup.string().required(VALIDATION.REQUIRED_FIELD),
    verdict: yup.string<Verdict>().required(VALIDATION.SELECTION_FIELD),
    reason: yup.string().required(VALIDATION.SELECTION_FIELD),
})
