import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import type { UuId } from '@shared/types'

export const useScrollToElement = <T extends HTMLElement = HTMLElement>(elements: UuId[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const scrollToUuid = searchParams.get('scrollToUuid')
    const refs = useRef<Map<string, T>>(new Map())

    const registerElementRef = (id: string) => (el: T | null) => {
        if (el) {
            refs.current.set(id, el)
        } else {
            refs.current.delete(id)
        }
    }

    useEffect(() => {
        if (scrollToUuid) {
            const el = refs.current.get(scrollToUuid)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                searchParams.delete('scrollToUuid')
                setSearchParams(searchParams, { replace: true })
            }
        }
    }, [elements, scrollToUuid])

    return registerElementRef
}
