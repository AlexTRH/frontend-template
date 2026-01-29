import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { i18n, init } from '@shared/lib/i18n'

type I18nProviderProps = {
    children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
    useEffect(() => {
        void init()
    }, [])

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
