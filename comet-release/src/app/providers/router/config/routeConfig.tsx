import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { RequestsPage } from '@pages/requests'
import { RequestByIDPage } from '@pages/request-by-id'
import { PositionsByRequestIDPage } from '@pages/positions-by-request-id'
import { PositionsPage } from '@pages/positions'
import { PositionByIDPage } from '@pages/position-by-id'
import { NotFoundPage } from '@pages/not-found'
import { LoginPage } from '@pages/login'
import { InterviewsPage } from '@pages/interviews'
import { DashboardPage } from '@pages/dashboard'
import { CandidatesPage } from '@pages/candidates'
import { CallbackPage } from '@pages/callback'

export const enum RouteLayout {
    AUTH = 'auth',
    PUBLIC = 'public',
    DEFAULT = 'default',
}

type AppRoutesProps = RouteProps & {
    layout: RouteLayout
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Navigate to={RoutePath.requests} replace />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
        layout: RouteLayout.PUBLIC,
    },
    [AppRoutes.REQUESTS]: {
        path: RoutePath.requests,
        element: <RequestsPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.REQUEST_BY_ID]: {
        path: RoutePath.request_by_id,
        element: <RequestByIDPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.POSITIONS]: {
        path: RoutePath.positions,
        element: <PositionsPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.POSITION_BY_ID]: {
        path: RoutePath.position_by_id,
        element: <PositionByIDPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.POSITIONS_BY_REQUEST_ID]: {
        path: RoutePath.positions_by_request_id,
        element: <PositionsByRequestIDPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.CANDIDATES]: {
        path: RoutePath.candidates,
        element: <CandidatesPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.INTERVIEWS]: {
        path: RoutePath.interviews,
        element: <InterviewsPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.CALLBACK]: {
        path: RoutePath.callback,
        element: <CallbackPage />,
        layout: RouteLayout.PUBLIC,
    },
    [AppRoutes.DASHBOARD]: {
        path: RoutePath.dashboard,
        element: <DashboardPage />,
        layout: RouteLayout.AUTH,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        layout: RouteLayout.DEFAULT,
    },
}
