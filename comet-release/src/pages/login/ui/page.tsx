import { lazy } from 'react'
const Login = lazy(() => import('../../../widgets/login/Login'))

export function LoginPage() {
    return <Login />
}
