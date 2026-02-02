import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { MainLayout } from '@widgets/layouts/main-layout'
import { PageLoader } from '@shared/ui/page-loader'
import { AppRoutes, RoutePath } from '@shared/config/router'

import { RequireAuth } from './RequireAuth'
import { DocumentTitle } from './DocumentHead'
import { HtmlLang } from './DocumentHead'

import { routeConfig } from '../config/routeConfig'

export function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <DocumentTitle />
            <HtmlLang />
            <Routes>
                <Route path={RoutePath[AppRoutes.LOGIN]} element={routeConfig[AppRoutes.LOGIN].element} />
                <Route element={<RequireAuth />}>
                    <Route element={<MainLayout />}>
                        <Route index element={routeConfig[AppRoutes.DASHBOARD].element} />
                        <Route path="items/:id" element={routeConfig[AppRoutes.ITEM_DETAIL].element} />
                        <Route path="items" element={routeConfig[AppRoutes.ITEMS].element} />
                        <Route path="settings" element={routeConfig[AppRoutes.SETTINGS].element} />
                        <Route path="components" element={routeConfig[AppRoutes.COMPONENTS].element} />
                    </Route>
                </Route>
                <Route path="*" element={routeConfig[AppRoutes.NOT_FOUND].element} />
            </Routes>
        </Suspense>
    )
}
