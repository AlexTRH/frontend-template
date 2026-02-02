/**
 * Default validation messages (fallback when i18n key is not used).
 * Prefer i18n keys in schemas (e.g. validation.required).
 */
export const VALIDATION = {
    REQUIRED_FIELD: 'Field is required',
    SELECTION_FIELD: 'Selection is required',
    NUMBER: 'Must be a number',
    POSITIVE_NUMBER: 'Must be a positive number',
    INTEGER: 'Must be an integer',
    MAX_50_CHARACTERS: 'Maximum length: 50 characters',
    AT_LEAST_ONE: 'Must be at least 1',
    VALID_URL: 'Must be a valid URL',
} as const
