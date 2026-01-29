import type { AnalyticsRate } from '@shared/types'
import type { Grade } from '@shared/constants'
import { GradeConfig } from '@entities/catalogs/grade'

import type { GradePercentage } from '../model'

export const generateFullGradeList = (grades: GradePercentage | null | undefined): Record<string, AnalyticsRate> => {
    const result: Record<string, AnalyticsRate> = {}

    for (const grade in GradeConfig) {
        const gradeKey = GradeConfig[grade as Grade]
        result[gradeKey] = (grades && grades[grade as Grade]) || '0'
    }

    return result
}
