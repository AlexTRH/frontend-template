import type { AnalyticsRate } from '@shared/types'
import type { Department } from '@shared/constants'
import { DepartmentConfig } from '@entities/catalogs/department'

import type { DepartmentPercentage } from '../model'

export const generateFullDepartmentList = (
    departments: DepartmentPercentage | null | undefined
): Record<string, AnalyticsRate> => {
    const result: Record<string, AnalyticsRate> = {}

    for (const department in DepartmentConfig) {
        const key = DepartmentConfig[department as Department]
        result[key] = (departments && departments[department as Department]) || '0'
    }

    return result
}
