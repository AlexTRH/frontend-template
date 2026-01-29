import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import type { DecodedJWTData } from '@shared/types'
import { getIdToken } from '@shared/lib/local-storage'

export function useDecodeIdToken() {
    const [decodedData, setDecodedData] = useState<DecodedJWTData | undefined>()
    const idToken = getIdToken()

    useEffect(() => {
        if (idToken) {
            const decoded = jwtDecode<DecodedJWTData>(idToken)
            setDecodedData(decoded)
        }
    }, [idToken])

    return decodedData
}
