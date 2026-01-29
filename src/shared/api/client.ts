import { toast } from 'sonner'
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const useMsw = import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true'
const API_BASE_URL = useMsw ? '/api' : (import.meta.env.VITE_API_URL ?? '/api')

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        if (status === 401) {
            localStorage.removeItem('token')
        } else if (status === 403) {
            toast.error('Access denied')
        } else if (status && status >= 500) {
            toast.error('Server error. Try again later.')
        }
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
    }
)
