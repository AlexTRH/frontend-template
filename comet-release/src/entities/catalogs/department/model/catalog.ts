import type { CatalogItem } from '@shared/types'
import { Department } from '@shared/constants'

import { DepartmentConfig } from './../config'

export const departmentCatalog: CatalogItem[] = [
    { uuid: Department.BE, title: DepartmentConfig[Department.BE] },
    { uuid: Department.DE, title: DepartmentConfig[Department.DE] },
    { uuid: Department.FS, title: DepartmentConfig[Department.FS] },
    { uuid: Department.GO, title: DepartmentConfig[Department.GO] },
    { uuid: Department.FE, title: DepartmentConfig[Department.FE] },
    { uuid: Department.AQA, title: DepartmentConfig[Department.AQA] },
    { uuid: Department.DO, title: DepartmentConfig[Department.DO] },
    { uuid: Department.BA, title: DepartmentConfig[Department.BA] },
    { uuid: Department.UU, title: DepartmentConfig[Department.UU] },
]
