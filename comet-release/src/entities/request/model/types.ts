import type * as yup from 'yup'
import type { CatalogItem, Email, UuId } from '@shared/types'
import type { Grade } from '@shared/constants/grade'
import type { Language, Currency, Department } from '@shared/constants'

import type { createRequestSchema, editRequestSchema } from './schema'

export type Request = {
    uuid: string
    project_name: string
    customer: CatalogItem | null
    intermediary: CatalogItem | null
    domain: string
    rate?: number
    rate_currency?: Currency
    expected_duration: number
    location: CatalogItem
    job_requirements: string | null
    grade: Grade
    department: Department
    developers_count: number | null
    is_internal_acquisition_channel: boolean
    status: RequestStatus
    description: string | null
    desired_people: Email[] | null
    created_by: Email
    created_at: string
    skip_reason: string | null
    is_successful: boolean
    google_chat_link: string | null
    language: Language
}

export const enum RequestStatus {
    NEW = 'New',
    SELECTION = 'Selection',
    STAFFING = 'Staffing',
    CV_PREPARATION = 'CV_preparation',
    AUDITING = 'Auditing',
    CLOSED = 'Closed',
}

export type CreatedRequestFormValue = yup.InferType<typeof createRequestSchema>
export type EditedRequestFormValue = yup.InferType<typeof editRequestSchema>

export type RequestFormData = Omit<
    CreatedRequestFormValue | EditedRequestFormValue,
    'customer_id' | 'intermediary_id' | 'location_id' | 'desired_people'
> & {
    customer_id?: UuId | null
    intermediary_id?: UuId | null
    location_id: UuId
    //desired_people?: Email[] | null
}
