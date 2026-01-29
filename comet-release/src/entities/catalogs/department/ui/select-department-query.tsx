import { SelectQueryParam } from '@shared/ui/selects'
import { DepartmentConfig } from '@entities/catalogs/department'

export function SelectDepartmentQuery() {
    return <SelectQueryParam config={DepartmentConfig} queryParam="department" placeholder="Select department" />
}
