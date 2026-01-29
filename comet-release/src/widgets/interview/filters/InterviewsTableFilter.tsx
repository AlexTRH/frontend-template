import { SearchInput } from '@shared/ui/search-input'
import { useInterviewsStore } from '@entities/interview/stage'

export function InterviewsTableFilter() {
    const { search } = useInterviewsStore((state) => state.params)
    const setParams = useInterviewsStore((state) => state.setParams)
    return (
        <div className="mb-4 w-full md:w-sm">
            <SearchInput search={search} setSearch={setParams} />
        </div>
    )
}
