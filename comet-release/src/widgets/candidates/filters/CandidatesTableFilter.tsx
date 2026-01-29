import { SearchInput } from '@shared/ui/search-input'
import { useCandidatesStore } from '@entities/candidate'

export function CandidatesTableFilter() {
    const { search } = useCandidatesStore((state) => state.params)
    const setParams = useCandidatesStore((state) => state.setParams)

    return (
        <div className="mb-4 w-full md:w-sm">
            <SearchInput search={search} setSearch={setParams} />
        </div>
    )
}
