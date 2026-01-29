function getRuntimeEnv(key: string) {
    const safeKey = `VITE_${key}`
    return window.__ENV?.[safeKey]
}

/**
 * Retrieves the value of an environment variable based on the provided key.
 * If the variable is not found and no default value is provided, an error will be thrown.
 *
 * @param key - The key of the environment variable.
 * @param defaultValue - The default value to be returned if the variable is not found.
 * @returns - The value of the environment variable or the default value, if provided.
 * @throws {Error} - If the variable is not found and no default value is provided.
 */
export const envVar = (key: string, defaultValue?: string): string => {
    const runtimeEnv = getRuntimeEnv(key.replace('VITE_', ''))
    if (import.meta.env[key] === undefined && runtimeEnv === undefined && defaultValue === undefined) {
        throw new Error(`Env variable ${key} is required`)
    }
    return (import.meta.env[key] || runtimeEnv || defaultValue) as string
}
