import { SelectDateRangeQuery } from '@shared/ui'
import { DepartmentConfig, SelectDepartmentQuery, useDepartmentSearchParam } from '@entities/catalogs'

export function DepartmentFilter() {
    const department = useDepartmentSearchParam()
    return (
        <div className="flex flex-wrap justify-between gap-4 mb-6">
            <h3>{DepartmentConfig[department]}</h3>
            <div className="flex flex-wrap gap-2">
                <SelectDepartmentQuery />
                <SelectDateRangeQuery />
            </div>
        </div>
    )
}
