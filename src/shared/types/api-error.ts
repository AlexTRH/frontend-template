/**
 * Типизированная ошибка валидации API (422/400).
 * Бэкенд может вернуть { errors: { fieldName: ['message'] } } или { message: string }.
 */
export type ApiValidationErrorBody = {
    errors?: Record<string, string[]>
    message?: string
}

export function getApiValidationErrors(error: unknown): ApiValidationErrorBody | null {
    const err = error as { response?: { data?: ApiValidationErrorBody; status?: number } }
    const status = err.response?.status
    if (status !== 400 && status !== 422) return null
    const data = err.response?.data
    if (!data || typeof data !== 'object') return null
    return data
}
