// Preprocess headers for fetch
export function preprocessHeaders<T>(
    body: T,
    headers: Record<string, string> | undefined,
    method: string
): Record<string, string> {
    if (method === 'GET' || method === 'HEAD') {
        return { ...headers }
    }
    if (body instanceof FormData) {
        return { Accept: 'application/json, text/plain', ...headers }
    }
    return {
        'Content-Type': 'application/json',
        ...headers,
    }
}
