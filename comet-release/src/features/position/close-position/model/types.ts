import type { Verdict } from '@shared/types'

export type ClosedPositionData = {
    verdict: Verdict
    comment: string
}

export type ClosedPositionFormValueData = {
    verdict: Verdict
    comment: string
    reason: string
}
