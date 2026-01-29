import type { Email, PaginationQueryParams, ResponseList } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

export const fetchCandidatesEmail = async ({
    search,
    limit = 5,
    offset = 0,
}: {
    search?: string
} & PaginationQueryParams): Promise<ResponseList<'persons', Email>> => {
    const email_only = true
    return await customFetchJson('/v1/persons/search', {
        queryParams: { search, limit, offset, email_only },
    })
}
