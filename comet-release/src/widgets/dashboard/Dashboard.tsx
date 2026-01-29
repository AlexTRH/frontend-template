import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs'
import { Error } from '@shared/ui/errors/error'
import { SelectDateRangeQuery } from '@shared/ui'
import { IS_DASHBOARD_AVAILABLE } from '@shared/lib/env'
import { useDepartmentSearchParam } from '@entities/catalogs/department'

import { useAnalyticsSearchParam } from './hooks'
import { DASHBOARD_TABS } from './config'

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams()
    const analytics = useAnalyticsSearchParam()
    const department = useDepartmentSearchParam()

    const onTabChange = (value: string) => {
        searchParams.set('analytics', value)
        searchParams.set('department', department)
        setSearchParams(searchParams)
    }

    if (IS_DASHBOARD_AVAILABLE !== 'true')
        return <Error title="Dashboard is unavailable now" description="Please try later" />

    return (
        <div>
            <h1>Dashboard</h1>
            <Tabs defaultValue={analytics} className="mt-8" onValueChange={onTabChange}>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <TabsList className="overflow-x-scroll max-w-full">
                        {DASHBOARD_TABS.map(({ trigger }) => (
                            <TabsTrigger key={trigger} value={trigger}>
                                {trigger}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {analytics === 'General Analytics' && <SelectDateRangeQuery />}
                </div>
                {DASHBOARD_TABS.map(({ trigger, content, filter }) => (
                    <TabsContent key={trigger} value={trigger}>
                        {filter}
                        {content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
