import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@shared/store/auth'

import { login, type LoginPayload } from '../api'

export function useLoginMutation() {
    const setAuth = useAuthStore((s) => s.setAuth)

    return useMutation({
        mutationFn: (payload: LoginPayload) => login(payload),
        onSuccess: ({ user, token }) => {
            setAuth(user, token)
        },
    })
}
