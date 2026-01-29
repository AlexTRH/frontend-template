export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REQUESTS = 'requests',
    REQUEST_BY_ID = 'request_by_id',
    POSITIONS = 'positions',
    POSITION_BY_ID = 'position_by_id',
    POSITIONS_BY_REQUEST_ID = 'positions_by_request_id',
    CANDIDATES = 'candidates',
    INTERVIEWS = 'interviews',
    CALLBACK = 'callback',
    DASHBOARD = 'dashboard',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REQUESTS]: '/requests/',
    [AppRoutes.REQUEST_BY_ID]: 'requests/:id',
    [AppRoutes.POSITIONS]: '/positions/',
    [AppRoutes.POSITION_BY_ID]: '/positions/:position_id',
    [AppRoutes.POSITIONS_BY_REQUEST_ID]: '/positions-by-request-id/',
    [AppRoutes.CANDIDATES]: '/candidates/',
    [AppRoutes.INTERVIEWS]: '/interviews/',
    [AppRoutes.CALLBACK]: '/callback',
    [AppRoutes.DASHBOARD]: '/dashboard',
    [AppRoutes.NOT_FOUND]: '*',
}
