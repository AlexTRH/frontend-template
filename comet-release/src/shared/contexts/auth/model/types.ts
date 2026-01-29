export type AuthContextType = {
    isAuthenticated: boolean
    setAuthenticated: (value: boolean | ((prev: boolean) => boolean)) => void
}
