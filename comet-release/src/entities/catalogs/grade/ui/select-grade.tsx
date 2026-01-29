import { SelectId } from '@shared/ui/selects'
import type { SelectProps } from '@radix-ui/react-select'
import { gradeCatalog } from '@entities/catalogs/grade'

export function SelectGrade({ onChange, ...rest }: SelectProps & { onChange: (val: string) => void }) {
    return (
        <SelectId
            placeholder="Select grade"
            label="Grades"
            list={gradeCatalog}
            id="grade"
            onChange={onChange}
            {...rest}
        />
    )
}
