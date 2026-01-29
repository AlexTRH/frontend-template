export enum AppRoutes {
    DASHBOARD = 'dashboard',
    ITEMS = 'items',
    SETTINGS = 'settings',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.DASHBOARD]: '/',
    [AppRoutes.ITEMS]: '/items',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
}
