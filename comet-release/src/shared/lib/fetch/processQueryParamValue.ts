import type { QueryParamValue } from '../../types/api'

export function processQueryParamValue(value: QueryParamValue): string | Array<string> {
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'boolean') return value.toString()
    if (value instanceof Date) return value.toISOString()
    if (Array.isArray(value)) return value.map(String)
    return value
}
