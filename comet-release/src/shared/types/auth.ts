export type TokenData = {
    access_token: string
    expires_in: number
    id_token: string
    refresh_token: string
    scope: string
    token_type: string
}

export type DecodedJWTData = {
    name: string
    nickname: string
    preferred_username: string
    email: string
    email_verified: boolean
    given_name: string
    groups: string[]
    iat: number
    exp: number
    auth_time: number
    acr: string
    aud: string
    iss: string
    sid: string
    sub: string
}
