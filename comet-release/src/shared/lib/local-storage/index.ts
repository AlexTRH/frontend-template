/*ACCESS TOKEN*/
import type { TokenData } from '@shared/types/auth'

export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token')
}

export const setAccessToken = (token: string): void => {
    localStorage.setItem('access_token', token)
}

export const removeAccessToken = (): void => {
    localStorage.removeItem('access_token')
}
/*REFRESH TOKEN*/
export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refresh_token')
}

export const setRefreshToken = (token: string): void => {
    localStorage.setItem('refresh_token', token)
}

export const removeRefreshToken = (): void => {
    localStorage.removeItem('refresh_token')
}
/*ID TOKEN*/
export const getIdToken = (): string | null => {
    return localStorage.getItem('id_token')
}
export const setIdToken = (token: string): void => {
    localStorage.setItem('id_token', token)
}
export const removeIdToken = (): void => {
    localStorage.removeItem('id_token')
}
/*ALL TOKENS*/
export const isAuthenticatedLocally = (): boolean => {
    return !!(getAccessToken() && getRefreshToken() && getIdToken())
}
export const setAllTokens = (tokenData: TokenData): void => {
    const { id_token, access_token, refresh_token } = tokenData
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    setIdToken(id_token)
}
export const removeAllTokens = (): void => {
    removeAccessToken()
    removeRefreshToken()
    removeIdToken()
}
/*IS AUTHENTICATED*/
export const removeIsAuthenticated = (): void => {
    localStorage.removeItem('isAuthenticated')
}
