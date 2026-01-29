import { lazy } from 'react'
const Dashboard = lazy(() => import('../../../widgets/dashboard/Dashboard'))

export function DashboardPage() {
    return <Dashboard />
}
