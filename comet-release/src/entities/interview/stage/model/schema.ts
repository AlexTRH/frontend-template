import * as yup from 'yup'
import { VALIDATION } from '@shared/constants/validation'

import type { InterviewType } from '../model/types'

export const createdInterviewStageSchema = yup.object({
    stage_name: yup.string().required(VALIDATION.REQUIRED_FIELD),
    start_datetime: yup.string().required(VALIDATION.REQUIRED_FIELD),
    duration: yup.number().positive(VALIDATION.POSITIVE_NUMBER).required(VALIDATION.REQUIRED_FIELD),
    meeting_link: yup.string().nullable().url(VALIDATION.VALID_URL),
    types: yup.mixed<InterviewType>().required(VALIDATION.REQUIRED_FIELD),
    description: yup.string().required(VALIDATION.REQUIRED_FIELD),
})
