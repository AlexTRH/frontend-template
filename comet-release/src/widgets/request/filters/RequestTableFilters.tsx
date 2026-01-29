import type { ReactNode } from 'react'
import { SearchInput } from '@shared/ui/search-input'
import { RequestFilterPanel } from '@features/request/filter-panel'
import { useRequestsStore } from '@entities/request'

type Props = {
    slot: ReactNode
}

export function RequestTableFilters({ slot }: Props) {
    const params = useRequestsStore((state) => state.params)
    const setParams = useRequestsStore((state) => state.setParams)

    return (
        <div className="flex justify-between flex-wrap gap-4 mb-4">
            <div className="w-full md:w-sm">
                <SearchInput search={params.search} setSearch={setParams} />
            </div>
            <div className="flex justify-between md:justify-start w-full md:w-auto gap-4">
                <RequestFilterPanel setParams={setParams} params={params} />
                {slot}
            </div>
        </div>
    )
}
