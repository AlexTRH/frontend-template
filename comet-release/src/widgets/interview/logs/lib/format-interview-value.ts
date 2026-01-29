import { formatDTOtoClient } from '@shared/lib/date'
import { InterviewDurationConfig, InterviewStatusConfig, InterviewTypeConfig } from '@entities/interview/stage'
import { DepartmentConfig, GradeConfig } from '@entities/catalogs'

export const formatInterviewValue = <TEntity>(key: keyof TEntity, value: unknown): string => {
    if (key === 'types') {
        return InterviewTypeConfig[value as keyof typeof InterviewTypeConfig] ?? value
    }
    if (key === 'grade') {
        return GradeConfig[value as keyof typeof GradeConfig] ?? value
    }
    if (key === 'department') {
        return DepartmentConfig[value as keyof typeof DepartmentConfig] ?? value
    }
    if (key === 'status') {
        return InterviewStatusConfig[value as keyof typeof InterviewStatusConfig].en ?? value
    }
    if (key === 'start_datetime' && typeof value === 'string') {
        return formatDTOtoClient(value)
    }
    if (key === 'duration') {
        return InterviewDurationConfig[value as keyof typeof InterviewDurationConfig] ?? value
    }
    return String(value)
}
