import type { CatalogItem } from '@shared/types'

import { InterviewType } from '../model/types'
import { InterviewTypeConfig } from '../config'

export const interviewTypeCatalog: CatalogItem[] = [
    { uuid: InterviewType.Prescreen, title: InterviewTypeConfig.Prescreen },
    { uuid: InterviewType.LiveCoding, title: InterviewTypeConfig.LiveCoding },
    { uuid: InterviewType.Technical, title: InterviewTypeConfig.Technical },
    { uuid: InterviewType.Product, title: InterviewTypeConfig.Product },
]
