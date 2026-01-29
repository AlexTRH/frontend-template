import type { TranslationBadgedCatalogItem } from '@shared/types'

import { InterviewStatus, InterviewType } from '../model/types'

export const InterviewTypeConfig: Record<InterviewType, string> = {
    [InterviewType.Prescreen]: 'Prescreen',
    [InterviewType.LiveCoding]: 'Live coding',
    [InterviewType.Technical]: 'Technical',
    [InterviewType.Product]: 'Product',
}

export const InterviewStatusConfig: Record<InterviewStatus, TranslationBadgedCatalogItem & { color: string }> = {
    [InterviewStatus.FAILED]: { en: 'Failed', badgeVariant: 'destructive', color: 'shadow-destructive' },
    [InterviewStatus.CANCELED]: { en: 'Canceled', badgeVariant: 'neutral', color: 'shadow-neutral-500' },
    [InterviewStatus.GOING]: { en: 'Going', badgeVariant: 'indigo', color: 'shadow-indigo-500' },
    [InterviewStatus.SCHEDULED]: { en: 'Scheduled', badgeVariant: 'teal', color: 'shadow-teal-500' },
    [InterviewStatus.PENDING_FEEDBACK]: { en: 'Pending feedback', badgeVariant: 'orange', color: 'shadow-orange-500' },
    [InterviewStatus.SUCCESSFUL]: { en: 'Successful', badgeVariant: 'green', color: 'shadow-green-500' },
}

export const InterviewDurationConfig: Record<number, string> = {
    15: '15 min',
    30: '30 min',
    60: '1 h',
    90: '1.5 h',
    120: '2 h',
    180: '3 h',
    240: '4 h',
}
