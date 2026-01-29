import * as yup from 'yup'
import { VALIDATION } from '@shared/constants'

export const editedPositionStageSchema = yup.object({
    cv_link: yup.string().required(VALIDATION.REQUIRED_FIELD).url(VALIDATION.VALID_URL),
})
