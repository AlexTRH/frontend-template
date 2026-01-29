import type * as yup from 'yup'
import type { CatalogItem, Email, UuId } from '@shared/types'
import type { Department, Grade } from '@shared/constants'

import type { createdInterviewStageSchema } from './schema'

export const enum InterviewType {
    Prescreen = 'Prescreen',
    Technical = 'Technical',
    LiveCoding = 'LiveCoding',
    Product = 'Product',
}

export type InterviewStage = {
    candidate_email: Email
    request_uuid: UuId
    request_positions_id: UuId
    start_datetime: string
    duration: number
    meeting_link: string
    types: InterviewType
    description: string
    stage_name: string
    uuid: UuId
    customer: CatalogItem | null
    intermediary: CatalogItem | null
    department: Department
    grade: Grade
    status: InterviewStatus
    created_by: string
}

export type CreatedInterviewFormValue = yup.InferType<typeof createdInterviewStageSchema>

export type CreatedInterviewData = CreatedInterviewFormValue & {
    candidate_email: string
    request_positions_id: UuId
}

export interface Feedback {
    uuid: UuId
    interview_id: string
    feedback_text: string
}

export const enum InterviewStatus {
    SCHEDULED = 'Scheduled',
    GOING = 'Going',
    CANCELED = 'Canceled',
    PENDING_FEEDBACK = 'Pending_feedback',
    SUCCESSFUL = 'Successful',
    FAILED = 'Failed',
}

export type InterviewStageMode = 'view' | 'create' | 'edit' | 'disabled'
