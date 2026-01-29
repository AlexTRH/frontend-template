import { SearchInput } from '@shared/ui/search-input'
import { usePositionsStore } from '@entities/position'

export function PositionsTableFilter() {
    const { search } = usePositionsStore((state) => state.params)
    const setParams = usePositionsStore((state) => state.setParams)
    return (
        <div className="mb-4 w-full md:w-sm">
            <SearchInput search={search} setSearch={setParams} />
        </div>
    )
}
