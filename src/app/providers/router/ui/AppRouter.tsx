import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { MainLayout } from '@widgets/layouts/main-layout'
import { PageLoader } from '@shared/ui/page-loader'
import { AppRoutes, RoutePath } from '@shared/config/router'

import { RequireAuth } from './RequireAuth'

import { routeConfig } from '../config/routeConfig'

export function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path={RoutePath[AppRoutes.LOGIN]} element={routeConfig[AppRoutes.LOGIN].element} />
                <Route element={<RequireAuth />}>
                    <Route element={<MainLayout />}>
                        <Route index element={routeConfig[AppRoutes.DASHBOARD].element} />
                        <Route path="items" element={routeConfig[AppRoutes.ITEMS].element} />
                        <Route path="settings" element={routeConfig[AppRoutes.SETTINGS].element} />
                    </Route>
                </Route>
                <Route path="*" element={routeConfig[AppRoutes.NOT_FOUND].element} />
            </Routes>
        </Suspense>
    )
}
