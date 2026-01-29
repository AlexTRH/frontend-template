export enum AppRoutes {
    HOME = 'home',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.NOT_FOUND]: '*',
}
