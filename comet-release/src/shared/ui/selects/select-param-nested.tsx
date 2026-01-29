import { Square, SquareCheckBig } from 'lucide-react'
import type { CatalogConfig, QueryParamsPayload } from '@shared/types'

type Props<K extends string> = {
    config: CatalogConfig<K>
    param: string
    value?: string
    setParams: (params: QueryParamsPayload) => void
    allOption?: boolean
}

export function SelectParamNested<K extends string>({ param, setParams, config, value = 'all', allOption }: Props<K>) {
    const handleValueChange = (newValue: K) => {
        if (newValue === 'all') setParams({ [param]: undefined })
        else setParams({ [param]: newValue, offset: 0 })
    }
    return (
        <ul className="bg-popover text-popover-foreground overflow-hidden">
            {Object.entries(allOption ? { all: 'All', ...config } : config).map(([key, item]) => {
                return (
                    <li
                        key={key}
                        onClick={() => handleValueChange(key as K)}
                        className="cursor-pointer focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
                    >
                        {key === value ? (
                            <SquareCheckBig className="size-4" color="var(--success-foreground)" />
                        ) : (
                            <Square className="size-4" />
                        )}
                        {item as K}
                    </li>
                )
            })}
        </ul>
    )
}
