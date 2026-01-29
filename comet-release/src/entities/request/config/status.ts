import type { BadgeVariant } from '@shared/ui/badge'

import { RequestStatus } from '../model/types'

export const RequestBadgeConfig: Record<RequestStatus, BadgeVariant> = {
    [RequestStatus.NEW]: 'gray',
    [RequestStatus.CLOSED]: 'light-green',
    [RequestStatus.AUDITING]: 'orange',
    [RequestStatus.CV_PREPARATION]: 'yellow',
    [RequestStatus.STAFFING]: 'blue',
    [RequestStatus.SELECTION]: 'light-blue',
}

export const RequestStatusConfig: Record<RequestStatus, string> = {
    [RequestStatus.NEW]: 'New',
    [RequestStatus.CLOSED]: 'Closed',
    [RequestStatus.AUDITING]: 'Auditing',
    [RequestStatus.CV_PREPARATION]: 'CV preparation',
    [RequestStatus.STAFFING]: 'Staffing',
    [RequestStatus.SELECTION]: 'Selection',
}
