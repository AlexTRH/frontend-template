import type { ClientResponseError, ValidationResponseError } from '@shared/types/response'
import type { QueryParamsPayload } from '@shared/types/api'
import { getAccessToken, getRefreshToken, setAllTokens } from '@shared/lib/local-storage'
import { API_URL, CLIENT_ID, CLIENT_SECRET, PULSAR_API_URL, TOKEN_ENDPOINT } from '@shared/lib/env'
import { logout } from '@shared/lib/auth'
import { fetchTokens } from '@shared/api'

import { preprocessHeaders } from './preprocessHeaders'
import { preProcessBody } from './preProcessBody'
import { pathJoin } from './pathJoin'
import { insertQueryParams } from './insertQueryParams'
import { HTTPRequestError } from './HTTPRequestError'

export type FetchPayloadType<T> = {
    method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
    body?: T
    headers?: Record<string, string>
    queryParams?: QueryParamsPayload
    pulsar?: boolean
}

let isRefreshing = false
let refreshPromise: Promise<void> | null = null
const subscribers: (() => void)[] = []

const subscribeTokenRefresh = (cb: () => void) => {
    subscribers.push(cb)
}

const onRefreshed = () => {
    subscribers.forEach((cb) => cb())
    subscribers.length = 0
}

export const refreshToken = async () => {
    const refresh_token = getRefreshToken()
    if (!refresh_token) {
        logout()
        throw new Error('No refresh token available')
    }

    const bodyParams = new URLSearchParams()
    bodyParams.append('grant_type', 'refresh_token')
    bodyParams.append('refresh_token', refresh_token)
    bodyParams.append('client_id', CLIENT_ID)
    bodyParams.append('client_secret', CLIENT_SECRET)

    try {
        const tokenData = await fetchTokens(TOKEN_ENDPOINT, bodyParams.toString())
        setAllTokens(tokenData)
        onRefreshed()
    } catch (err) {
        console.error('Error refreshing token:', err)
        logout()
        throw err
    }
}

export const customFetch = async <TBody = object>(
    url: string,
    { method = 'GET', body, headers, queryParams, pulsar }: FetchPayloadType<TBody> = {}
): Promise<Response> => {
    let processedUrl = url

    // Проверяем, является ли URL абсолютным
    if (!/^https?:\/\//i.test(url)) {
        // Добавляем API_URL только для относительных URL
        processedUrl = insertQueryParams(pathJoin([pulsar ? PULSAR_API_URL : API_URL, url]), queryParams)
    } else if (queryParams) {
        // Для абсолютных URL добавляем queryParams, если они есть
        processedUrl = insertQueryParams(url, queryParams)
    }

    const processedBody = preProcessBody<TBody>(body as TBody)
    const processedHeaders = preprocessHeaders<TBody>(body as TBody, headers, method)

    // --- Добавляем Authorization token ---
    const token = getAccessToken()
    if (token) {
        processedHeaders['Authorization'] = `${token}`
    }

    const refresh_token = getRefreshToken()
    if (refresh_token) {
        processedHeaders['Refresh-Token'] = refresh_token
    }

    const response = await fetch(processedUrl, {
        method,
        body: processedBody,
        headers: processedHeaders,
        credentials: 'include',
    })

    if (response.status >= 500) {
        throw new HTTPRequestError('server-error')
    }
    if (response.status === 422) {
        const result = (await response.json()) as ValidationResponseError
        throw new HTTPRequestError(result.detail[0].msg, { body: result })
    }
    if (response.status === 404) {
        throw new HTTPRequestError('not-found')
    }
    if (response.status === 403) {
        throw new HTTPRequestError('no-permission')
    }
    if (response.status === 400) {
        const result = (await response.json()) as ClientResponseError
        throw new HTTPRequestError(result.detail.message, { body: result })
    }

    if (response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true
            refreshPromise = refreshToken()
                .then(() => {
                    isRefreshing = false
                    onRefreshed()
                })
                .catch(() => {
                    isRefreshing = false
                })
        }

        if (refreshPromise) {
            await refreshPromise
            return new Promise<Response>((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                subscribeTokenRefresh(async () => {
                    const newToken = getAccessToken()
                    if (newToken) {
                        processedHeaders['Authorization'] = `Bearer ${newToken}`
                    }
                    try {
                        const retryResponse = await fetch(processedUrl, {
                            method,
                            body: processedBody,
                            headers: processedHeaders,
                            credentials: 'include',
                        })
                        if (!retryResponse.ok) {
                            throw new HTTPRequestError('unknown-error')
                        }
                        resolve(retryResponse)
                    } catch (err) {
                        reject(err as Error)
                    }
                })
            })
        }
    }

    if (!response.ok) {
        throw new HTTPRequestError('unknown-error')
    }

    return response
}
