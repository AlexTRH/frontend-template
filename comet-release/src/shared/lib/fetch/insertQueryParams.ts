// Helper to insert query parameters into a URL
import { processQueryParamValue } from './processQueryParamValue'
import { encodeQueryParams } from './encodeQueryParams'

import type { QueryParamsPayload } from '../../types/api'

export function insertQueryParams(baseUrl: string, payload?: QueryParamsPayload): string {
    if (!payload) {
        return baseUrl
    }
    const filteredPayload = Object.entries(payload).reduce(
        (acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = processQueryParamValue(value)
            }
            return acc
        },
        {} as Record<string, string | string[]>
    )
    const encoded = encodeQueryParams(filteredPayload)
    return `${baseUrl}?${encoded}`
}
