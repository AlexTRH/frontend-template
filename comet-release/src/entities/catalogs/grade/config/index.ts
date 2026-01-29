import { Grade } from '@shared/constants/grade'

export const GradeConfig: Record<Grade, string> = {
    [Grade.TEAM_LEAD]: 'Team Lead',
    [Grade.SENIOR_PLUS]: 'Senior+',
    [Grade.SENIOR]: 'Senior',
    [Grade.SENIOR_MINUS]: 'Senior-',
    [Grade.MIDDLE_PLUS]: 'Middle+',
    [Grade.MIDDLE]: 'Middle',
    [Grade.MIDDLE_MINUS]: 'Middle-',
    [Grade.JUNIOR_PLUS]: 'Junior+',
    [Grade.JUNIOR]: 'Junior',
    [Grade.TRAINEE]: 'Trainee',
}
