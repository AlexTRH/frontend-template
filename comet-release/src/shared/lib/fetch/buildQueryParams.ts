export const buildQueryParams = (params: Record<string, string | number | undefined | Date>): string => {
    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            query.append(key, value.toString())
        }
    }

    return query.toString()
}
