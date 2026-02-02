/**
 * Валидация env при старте. В production без MSW обычно нужен VITE_API_URL.
 * Сообщение об ошибке на английском — для логов CI/деплоя.
 */
export function validateEnv(): { valid: true } | { valid: false; message: string } {
    if (import.meta.env.DEV) {
        return { valid: true }
    }
    const useMsw = import.meta.env.VITE_USE_MSW === 'true'
    const apiUrl = import.meta.env.VITE_API_URL
    if (!useMsw && !apiUrl) {
        return {
            valid: false,
            message:
                'In production, set VITE_API_URL in your environment (e.g. in .env or CI). Without it, requests go to /api relative to the current origin.',
        }
    }
    return { valid: true }
}
