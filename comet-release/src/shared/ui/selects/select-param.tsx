import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select'
import type { CatalogConfig, QueryParamsPayload } from '@shared/types'

type Props<K extends string> = {
    config: CatalogConfig<K>
    param: string
    value?: string
    setParams: (params: QueryParamsPayload) => void
    placeholder: string
    label?: string
    allOption?: boolean
}

export function SelectParam<K extends string>({
    param,
    setParams,
    config,
    placeholder,
    label,
    value = 'all',
    allOption,
}: Props<K>) {
    const handleValueChange = (newValue: K) => {
        if (newValue === 'all') setParams({ [param]: undefined })
        else setParams({ [param]: newValue, offset: 0 })
    }

    return (
        <Select value={value} onValueChange={handleValueChange}>
            <SelectTrigger className="min-w-[180px] border-ring">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {allOption && <SelectItem value="all">All</SelectItem>}
                    {Object.entries(config).map(([key, value]) => {
                        return (
                            <SelectItem key={key} value={key}>
                                {value as K}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
