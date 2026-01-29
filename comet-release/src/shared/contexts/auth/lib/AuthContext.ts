import { createContext } from 'react'

import type { AuthContextType } from '../model/types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
