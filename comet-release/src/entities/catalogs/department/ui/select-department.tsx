import { SelectId } from '@shared/ui/selects'
import type { SelectProps } from '@radix-ui/react-select'

import { departmentCatalog } from '../model'

export function SelectDepartment({ onChange, ...rest }: SelectProps & { onChange: (val: string) => void }) {
    return (
        <SelectId
            placeholder="Select department"
            label="Departments"
            list={departmentCatalog}
            id="department"
            onChange={onChange}
            {...rest}
        />
    )
}
