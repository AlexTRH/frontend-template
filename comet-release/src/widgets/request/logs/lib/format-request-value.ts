import { RequestStatusConfig } from '@entities/request'
import { DepartmentConfig, GradeConfig, LanguageConfig } from '@entities/catalogs'

export const formatRequestValue = <TEntity>(key: keyof TEntity, value: unknown): string => {
    if (key === 'grade') {
        return GradeConfig[value as keyof typeof GradeConfig] ?? value
    }
    if (key === 'department') {
        return DepartmentConfig[value as keyof typeof DepartmentConfig] ?? value
    }
    if (key === 'status') {
        return RequestStatusConfig[value as keyof typeof RequestStatusConfig] ?? value
    }
    if (key === 'language') {
        return LanguageConfig[value as keyof typeof LanguageConfig] ?? value
    }
    if (key === 'expected_duration') {
        return typeof value === 'number' ? `${value} ${value > 1 ? 'months' : 'month'}` : String(value)
    }
    return String(value)
}
