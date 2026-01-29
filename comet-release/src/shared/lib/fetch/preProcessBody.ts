export function preProcessBody<T>(body: T): string | FormData | null {
    if (!body) return null
    if (body instanceof FormData) return body
    if (typeof body === 'string') return body
    return JSON.stringify(body)
}
