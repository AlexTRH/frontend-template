/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_PULSAR_API_URL: string
    readonly VITE_TOKEN_ENDPOINT: string
    readonly VITE_CLIENT_SECRET: string
    readonly VITE_CLIENT_ID: string
    readonly VITE_SSO_AUTH_URL: string
    readonly VITE_IS_DASHBOARD_AVAILABLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
