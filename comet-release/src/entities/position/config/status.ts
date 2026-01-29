import type { TranslationBadgedCatalogItem } from '@shared/types'

import { PositionStatus } from '../model/types'

export const PositionStatusConfig: Record<PositionStatus, TranslationBadgedCatalogItem & { disabled: boolean }> = {
    [PositionStatus.APPROVED]: { en: 'Approved', badgeVariant: 'green', disabled: true },
    [PositionStatus.CHOOSED]: { en: 'Chosen', badgeVariant: 'blue', disabled: false },
    [PositionStatus.CANCELED]: { en: 'Canceled', badgeVariant: 'destructive', disabled: true },
    [PositionStatus.CV_MADE]: { en: 'CV made', badgeVariant: 'orange', disabled: false },
    [PositionStatus.CV_ACCEPTED]: { en: 'CV accepted', badgeVariant: 'teal', disabled: true },
    [PositionStatus.CV_DECLINED]: { en: 'CV declined', badgeVariant: 'destructive', disabled: true },
    [PositionStatus.INTERVIEWING]: { en: 'Interviewing', badgeVariant: 'lime', disabled: false },
    [PositionStatus.PRE_HIRED]: { en: 'Pre-hired', badgeVariant: 'indigo', disabled: false },
    [PositionStatus.REJECTED]: { en: 'Rejected', badgeVariant: 'destructive', disabled: true },
}
