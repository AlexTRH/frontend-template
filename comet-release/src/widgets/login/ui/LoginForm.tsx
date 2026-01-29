import { Button } from '@shared/ui/button'
import { CLIENT_ID, SSO_AUTH_URL } from '@shared/lib/env'

export function LoginForm() {
    // При клике перенаправим на authorization_endpoint
    const handleSsoLogin = () => {
        const redirectUri = `${window.location.origin}/callback`
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            scope: 'openid profile email offline_access',
            redirect_uri: redirectUri,
        })

        // отправляем на SSO-сервер
        window.location.href = `${SSO_AUTH_URL}?${params.toString()}`
    }

    return (
        <div className="w-full lg:w-1/2 text-center lg:text-start lg:px-20">
            <h1 className="text-4xl">Hello again!</h1>
            <p className="text-xl text-muted-foreground font-medium mt-3">Welcome to the staffing system</p>

            <div className="flex flex-col justify-center mt-16 space-y-3">
                <p className="text-center font-medium text-muted-foreground">Please log in with</p>
                <Button type="button" onClick={handleSsoLogin} variant="default">
                    <img src="/google-icon.svg" width={20} height={20} alt="google" />
                    Google
                </Button>
            </div>
        </div>
    )
}
