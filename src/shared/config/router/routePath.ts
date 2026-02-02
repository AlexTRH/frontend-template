export enum AppRoutes {
    DASHBOARD = 'dashboard',
    ITEMS = 'items',
    ITEM_DETAIL = 'item_detail',
    SETTINGS = 'settings',
    COMPONENTS = 'components',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.DASHBOARD]: '/',
    [AppRoutes.ITEMS]: '/items',
    [AppRoutes.ITEM_DETAIL]: '/items/:id',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.COMPONENTS]: '/components',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
}
