import { useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
    buttonVariants,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@shared/ui'
import type { CatalogConfig, WithQueryKey } from '@shared/types'

type Props<K extends string> = {
    config: CatalogConfig<K>
    queryParam: string
    placeholder: string
    label?: string
    allOption?: boolean
} & WithQueryKey

export function SelectQueryParam<K extends string>({
    queryKey,
    queryParam,
    config,
    placeholder,
    label,
    allOption,
}: Props<K>) {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get(queryParam) || ''

    const handleValueChange = async (newValue: K) => {
        if (newValue === 'ALL') searchParams.delete(queryParam)
        else searchParams.set(queryParam, newValue)
        searchParams.delete('offset')
        setSearchParams(searchParams)
        if (queryKey) await queryClient.invalidateQueries({ queryKey: [...queryKey, newValue] })
    }

    return (
        <Select value={query} onValueChange={handleValueChange}>
            <SelectTrigger className={buttonVariants({ variant: 'default' })}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {allOption && <SelectItem value="ALL">All</SelectItem>}
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
