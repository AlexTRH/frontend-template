import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { getApiValidationErrors } from '@shared/types/api-error'

/**
 * Маппинг ошибок API (422/400) в react-hook-form setError.
 * Если бэкенд вернул { errors: { title: ['Required'] } }, вызовет setError('title', { message: 'Required' }).
 */
export function setFormErrorsFromApi<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>): boolean {
    const body = getApiValidationErrors(error)
    if (!body?.errors) return false
    let applied = false
    for (const [field, messages] of Object.entries(body.errors)) {
        const message = Array.isArray(messages) ? messages[0] : String(messages)
        if (message) {
            setError(field as Path<T>, { type: 'server', message })
            applied = true
        }
    }
    return applied
}
