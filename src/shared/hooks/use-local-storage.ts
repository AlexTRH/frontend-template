import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            if (item !== null) {
                return JSON.parse(item) as T
            }
            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        }
    })

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== key) return
            try {
                if (e.newValue !== null) {
                    setStoredValue(JSON.parse(e.newValue) as T)
                } else {
                    setStoredValue(defaultValue)
                }
            } catch {
                setStoredValue(defaultValue)
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [key, defaultValue])

    const setValue = (value: T | ((prevValue: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            localStorage.setItem(key, JSON.stringify(valueToStore))
            setStoredValue(valueToStore)
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue]
}
