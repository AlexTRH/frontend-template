export function encodeQueryParams(params: Record<string, string | string[]>): string {
    return Object.entries(params)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map((v) => encodeQueryParams({ [key]: v })).join('&')
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .join('&')
}
