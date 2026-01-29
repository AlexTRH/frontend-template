import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select'
import type { CatalogItem } from '@shared/types'

export function SelectTitle({
    list,
    id,
    label,
    placeholder,
    value,
    onChange,
    disabled,
}: {
    list: CatalogItem[]
    id?: string
    label: string
    placeholder: string
    value?: string
    onChange?: (val: string) => void
    disabled?: boolean
}) {
    return (
        <Select onValueChange={onChange} value={value} disabled={disabled}>
            <SelectTrigger className="w-full" id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {list.map((item) => (
                        <SelectItem key={item.uuid} value={item.title}>
                            {item.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
