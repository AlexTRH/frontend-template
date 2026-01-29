import type { TokenData } from '@shared/types/auth'
import { customFetchJson } from '@shared/lib/fetch'

export const fetchTokens = async (url: string, body: string) => {
    return await customFetchJson<string, TokenData>(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    })
}
