import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { AppRoutes, RoutePath } from '@shared/config/router'

function getTitleKey(pathname: string): string {
    if (pathname === '/') return 'dashboard'
    if (pathname.startsWith('/items/')) return 'itemDetail'
    const pathToKey: Record<string, string> = {
        [RoutePath[AppRoutes.DASHBOARD]]: 'dashboard',
        [RoutePath[AppRoutes.ITEMS]]: 'items',
        [RoutePath[AppRoutes.SETTINGS]]: 'settings',
        [RoutePath[AppRoutes.COMPONENTS]]: 'components',
        [RoutePath[AppRoutes.LOGIN]]: 'login',
    }
    return pathToKey[pathname] ?? 'notFound'
}

export function DocumentTitle() {
    const { pathname } = useLocation()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (!i18n.isInitialized) return
        const key = getTitleKey(pathname)
        const pageTitle = t(`common.pageTitle.${key}`)
        const appTitle = t('common.title')
        document.title = pageTitle && appTitle ? `${pageTitle} | ${appTitle}` : appTitle || 'App'
    }, [pathname, t, i18n])

    return null
}

export function HtmlLang() {
    const { i18n } = useTranslation()

    useEffect(() => {
        if (i18n.language) {
            document.documentElement.lang = i18n.language
        }
    }, [i18n.language])

    return null
}
