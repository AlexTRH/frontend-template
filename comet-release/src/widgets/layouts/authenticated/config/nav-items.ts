import { GitPullRequest, UserRoundCheck, Users } from 'lucide-react'
import { RoutePath } from '@shared/config/router'

export const APP_NAVIGATION_ITEMS = [
    {
        title: 'Requests',
        url: RoutePath.requests,
        icon: GitPullRequest,
    },
    {
        title: 'Requests positions',
        url: RoutePath.positions,
        icon: Users,
    },
    {
        title: 'Interviews',
        url: RoutePath.interviews,
        icon: UserRoundCheck,
    },
]
