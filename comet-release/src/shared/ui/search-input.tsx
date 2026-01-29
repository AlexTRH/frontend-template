import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { InputWithIcon } from '@shared/ui/with'
import type { QueryParamsPayload } from '@shared/types'
import { useDebounce } from '@shared/hooks'

type Props = {
    search?: string
    setSearch: (params: QueryParamsPayload) => void
}
export function SearchInput({ search = '', setSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState(search)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setSearch({ search: debouncedSearchTerm })
        } else setSearch({ search: undefined, offset: 0 })
    }, [debouncedSearchTerm])

    return (
        <InputWithIcon
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            icon={<Search className="h-4 w-4" />}
        />
    )
}
