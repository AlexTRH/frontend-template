import type { ResponseList, Email } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

export const fetchRequestCreators = async (): Promise<ResponseList<'creators', Email>> => {
    return await customFetchJson('/v1/filters/requests/creators')
}
