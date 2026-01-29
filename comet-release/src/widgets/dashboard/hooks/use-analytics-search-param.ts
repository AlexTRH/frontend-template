import { useSearchParams } from 'react-router-dom'

import { DASHBOARD_TABS } from '../config'

export const useAnalyticsSearchParam = (): string => {
    const [searchParams] = useSearchParams()
    return searchParams.get('analytics') || DASHBOARD_TABS[0].trigger
}
