import * as yup from 'yup'
import { VALIDATION } from '@shared/constants/validation'
export const feedbackActionSchema = yup.object({
    feedback_text: yup.string().required(VALIDATION.REQUIRED_FIELD),
})
