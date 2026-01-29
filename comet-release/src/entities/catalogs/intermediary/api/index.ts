import type { ResponseList } from '@shared/types/response'
import type { CatalogItem, PaginationQueryParams, UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

export const fetchIntermediaries = async ({
    search,
    limit = DEFAULT_PAGINATION_LIMIT,
    offset = DEFAULT_PAGINATION_OFFSET,
}: {
    search?: string
} & PaginationQueryParams): Promise<ResponseList<'intermediaries', CatalogItem>> => {
    return await customFetchJson('/v1/intermediaries', { queryParams: { search, limit, offset } })
}

export const createIntermediary = async (title: string) => {
    return await customFetchJson<{ title: string }, UuId>('/v1/intermediaries', {
        method: 'POST',
        body: { title },
    })
}
