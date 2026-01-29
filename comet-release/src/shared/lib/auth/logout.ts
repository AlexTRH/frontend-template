import { removeAllTokens, removeIsAuthenticated } from '@shared/lib/local-storage'
import { RoutePath } from '@shared/config/router'

export const logout = () => {
    removeIsAuthenticated()
    removeAllTokens()
    window.location.href = RoutePath.login
}
