import { useSearchParams } from 'react-router-dom'

export const useEmailSearchParam = () => {
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') || undefined
    return { email }
}
