import { Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { memo, Suspense } from 'react'
import { PublicLayout } from '@widgets/layouts/public'
import { AuthenticatedLayout } from '@widgets/layouts/authenticated'
import { PageLoader } from '@shared/ui/page-loader'

import { routeConfig, RouteLayout } from '../config/routeConfig'

type LayoutMapType = Record<RouteLayout, (element: ReactNode) => ReactNode>

const layoutMap: LayoutMapType = {
    [RouteLayout.AUTH]: (element: ReactNode) => <AuthenticatedLayout>{element}</AuthenticatedLayout>,
    [RouteLayout.PUBLIC]: (element: ReactNode) => <PublicLayout>{element}</PublicLayout>,
    [RouteLayout.DEFAULT]: (element: ReactNode) => element,
}

function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(({ path, layout, element }) => (
                    <Route key={path} path={path} element={layoutMap[layout](element)} />
                ))}
            </Routes>
        </Suspense>
    )
}

export default memo(AppRouter)
