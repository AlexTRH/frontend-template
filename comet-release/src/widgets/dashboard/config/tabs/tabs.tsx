import type { ReactNode } from 'react'

import {
    DepartmentAnalytics,
    DepartmentFilter,
    EmployeeAnalytics,
    FilterEmployeePanel,
    GeneralAnalytics,
} from '../../ui'

type DashboardTab = {
    trigger: 'General Analytics' | 'Department Analytics' | 'Employee Analytics'
    content: ReactNode
    filter?: ReactNode
}

export const DASHBOARD_TABS: DashboardTab[] = [
    {
        trigger: 'General Analytics',
        content: <GeneralAnalytics />,
    },
    {
        trigger: 'Department Analytics',
        content: <DepartmentAnalytics />,
        filter: <DepartmentFilter />,
    },
    {
        trigger: 'Employee Analytics',
        content: <EmployeeAnalytics />,
        filter: <FilterEmployeePanel />,
    },
]
