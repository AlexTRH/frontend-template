import type { CatalogItem } from '@shared/types'
import { Language } from '@shared/constants'

import { LanguageConfig } from './../config'

export const languageCatalog: CatalogItem[] = [
    { uuid: Language.RU, title: LanguageConfig[Language.RU] },
    { uuid: Language.EN, title: LanguageConfig[Language.EN] },
    { uuid: Language.DE, title: LanguageConfig[Language.DE] },
]
