import * as yup from 'yup'
import { VALIDATION } from '@shared/constants'

export const closeRequestSchema = yup.object({
    skip_reason: yup.string().required(VALIDATION.REQUIRED_FIELD),
})
