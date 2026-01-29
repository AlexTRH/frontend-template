import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { PageLoader } from '@shared/ui/page-loader'
import { setAllTokens } from '@shared/lib/local-storage'
import { CLIENT_ID, CLIENT_SECRET, TOKEN_ENDPOINT } from '@shared/lib/env'
import { useAuth } from '@shared/contexts/auth'
import { RoutePath } from '@shared/config/router'
import { fetchTokens } from '@shared/api'

export function CallbackPage() {
    const { setAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
        const doTokenRequest = async () => {
            if (!code) {
                await navigate(RoutePath.login)
                return
            }

            const bodyParams = new URLSearchParams()
            bodyParams.append('grant_type', 'authorization_code')
            bodyParams.append('code', code)
            bodyParams.append('redirect_uri', `${window.location.origin}/callback`)
            bodyParams.append('client_id', CLIENT_ID)
            bodyParams.append('client_secret', CLIENT_SECRET)

            try {
                const tokenData = await fetchTokens(TOKEN_ENDPOINT, bodyParams.toString())
                setAllTokens(tokenData)
                setAuthenticated(true)
                await navigate(RoutePath.requests, { replace: true })
            } catch (err) {
                console.error('Ошибка при получении токена:', err)
                await navigate(RoutePath.login, { replace: true })
            }
        }

        void doTokenRequest()
    }, [code, navigate])

    return <PageLoader />
}
