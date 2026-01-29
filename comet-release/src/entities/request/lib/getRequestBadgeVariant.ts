import type { BadgeVariant } from '@shared/ui/badge'

import { RequestStatus } from '../model'
import { RequestBadgeConfig } from '../config'

export function getRequestBadgeVariant(status: RequestStatus, is_successful: boolean): BadgeVariant {
    return status === RequestStatus.CLOSED && !is_successful ? 'destructive' : RequestBadgeConfig[status]
}
