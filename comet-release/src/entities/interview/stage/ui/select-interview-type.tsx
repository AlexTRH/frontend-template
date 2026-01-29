import { SelectId } from '@shared/ui/selects'

import { interviewTypeCatalog } from '../model/catalog'
export function SelectInterviewType({
    value,
    onChange,
    disabled,
}: {
    value?: string
    onChange?: (val: string) => void
    disabled?: boolean
}) {
    return (
        <SelectId
            placeholder="Select type"
            label="Type"
            list={interviewTypeCatalog}
            id="types"
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
    )
}
