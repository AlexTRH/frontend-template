import type * as yup from 'yup'
import type { UuId, Verdict } from '@shared/types'

import type { feedbackActionSchema } from './schema'

export type FeedbackFormValue = yup.InferType<typeof feedbackActionSchema>

export type FeedbackData = FeedbackFormValue & {
    verdict: Verdict
    interview_id: UuId
}
