import type { UuId } from '@shared/types'
import type { Department, Grade } from '@shared/constants'

export type Position = {
    uuid: UuId
    cv_link: string
    status: PositionStatus
    is_open: boolean
    project_name: string
    candidate_email: string
    customer_name: string
    intermediary_name: string
    grade: Grade
    department: Department
    request_uuid: UuId
}
export const enum PositionStatus {
    CHOOSED = 'Choosed',
    CV_MADE = 'CV_Made',
    CV_ACCEPTED = 'CV_accepted',
    CV_DECLINED = 'CV_declined',
    INTERVIEWING = 'Interviewing',
    PRE_HIRED = 'Pre_hired',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    CANCELED = 'Canceled',
}
