import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select'
import type { CatalogItemInteger } from '@shared/types'

export function SelectIdInt({
    list,
    id,
    label,
    placeholder,
    value,
    onChange,
    disabled,
}: {
    list: CatalogItemInteger[]
    id?: string
    label: string
    placeholder: string
    value?: number
    onChange: (val: number) => void
    disabled?: boolean
}) {
    const handleValueChange = (value: string) => {
        onChange(Number(value))
    }

    return (
        <Select onValueChange={handleValueChange} value={value?.toString() || ''} disabled={disabled}>
            <SelectTrigger className="w-full" id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {list.map((item) => (
                        <SelectItem key={item.uuid} value={item.uuid.toString()}>
                            {item.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
