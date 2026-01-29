import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { MainLayout } from '@widgets/layouts/main-layout'
import { PageLoader } from '@shared/ui/page-loader'

import { routeConfig } from '../config/routeConfig'

export function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route element={<MainLayout />}>
                    {Object.values(routeConfig).map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    )
}
