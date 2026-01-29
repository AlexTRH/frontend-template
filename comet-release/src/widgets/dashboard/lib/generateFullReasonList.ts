import type { AnalyticsRate } from '@shared/types'
import { RejectReason } from '@shared/constants'

const reasonsList: RejectReason[] = [
    RejectReason.DIDNT_LIKE_CV,
    RejectReason.FOUND_ANOTHER_CANDIDATE,
    RejectReason.LOCATION_CHECK,
    RejectReason.CULTURAL_MISMATCH,
    RejectReason.LOW_TECH_LEVEL,
    RejectReason.POOR_ENGLISH,
    RejectReason.OTHER,
]

export const generateFullReasonList = (
    reasons: Partial<Record<RejectReason, AnalyticsRate>> | null | undefined
): Record<string, AnalyticsRate> => {
    const result: Record<string, AnalyticsRate> = {}

    for (const reason of reasonsList) {
        result[reason] = (reasons && reasons[reason]) || '0'
    }

    return result
}
