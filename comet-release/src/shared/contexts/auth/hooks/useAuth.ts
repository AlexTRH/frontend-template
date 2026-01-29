import { useContext } from 'react'

import type { AuthContextType } from '../model/types'
import { AuthContext } from '../lib/AuthContext'

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
