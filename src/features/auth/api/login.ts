import { apiClient } from '@shared/api/client'
import type { User } from '@entities/user'

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    user: User
    token: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
    return data
}
