import { SelectIdInt } from '@shared/ui/selects'
import type { CatalogItemInteger } from '@shared/types'

const DurationData: CatalogItemInteger[] = [
    { uuid: 15, title: '15 min' },
    { uuid: 30, title: '30 min' },
    { uuid: 60, title: '1 h' },
    { uuid: 90, title: '1.5 h' },
    { uuid: 120, title: '2 h' },
    { uuid: 180, title: '3 h' },
    { uuid: 240, title: '4 h' },
]
export function SelectDuration({
    value,
    onChange,
    disabled,
    id = 'duration',
}: {
    value?: number
    onChange: (val: number) => void
    disabled?: boolean
    id?: string
}) {
    return (
        <SelectIdInt
            placeholder="Select duration"
            label="Duration"
            list={DurationData}
            id={id}
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
    )
}
