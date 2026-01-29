import { envVar } from './get-env-var'

export const API_URL = envVar('VITE_API_URL')
export const PULSAR_API_URL = envVar('VITE_PULSAR_API_URL')
export const TOKEN_ENDPOINT = envVar('VITE_TOKEN_ENDPOINT')
export const CLIENT_SECRET = envVar('VITE_CLIENT_SECRET')
export const CLIENT_ID = envVar('VITE_CLIENT_ID')
export const SSO_AUTH_URL = envVar('VITE_SSO_AUTH_URL')
export const IS_DASHBOARD_AVAILABLE = envVar('VITE_IS_DASHBOARD_AVAILABLE')
