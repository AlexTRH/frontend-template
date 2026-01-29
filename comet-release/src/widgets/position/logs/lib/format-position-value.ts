import { PositionStatusConfig } from '@entities/position'
import { DepartmentConfig, GradeConfig } from '@entities/catalogs'

export const formatPositionValue = <TEntity>(key: keyof TEntity, value: unknown): string => {
    if (key === 'grade') {
        return GradeConfig[value as keyof typeof GradeConfig] ?? value
    }
    if (key === 'department') {
        return DepartmentConfig[value as keyof typeof DepartmentConfig] ?? value
    }
    if (key === 'status') {
        return PositionStatusConfig[value as keyof typeof PositionStatusConfig].en ?? value
    }
    return String(value)
}
