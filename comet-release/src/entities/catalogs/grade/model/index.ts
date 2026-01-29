import type { CatalogItem } from '@shared/types'
import { Grade } from '@shared/constants'

import { GradeConfig } from '../config'

export const gradeCatalog: CatalogItem[] = [
    { uuid: Grade.TEAM_LEAD, title: GradeConfig.Team_lead },
    { uuid: Grade.SENIOR_PLUS, title: GradeConfig.Senior_plus },
    { uuid: Grade.SENIOR, title: GradeConfig.Senior },
    { uuid: Grade.SENIOR_MINUS, title: GradeConfig.Senior_minus },
    { uuid: Grade.MIDDLE_PLUS, title: GradeConfig.Middle_plus },
    { uuid: Grade.MIDDLE, title: GradeConfig.Middle },
    { uuid: Grade.MIDDLE_MINUS, title: GradeConfig.Middle_minus },
    { uuid: Grade.JUNIOR_PLUS, title: GradeConfig.Junior_plus },
    { uuid: Grade.JUNIOR, title: GradeConfig.Junior },
    { uuid: Grade.TRAINEE, title: GradeConfig.Trainee },
]
