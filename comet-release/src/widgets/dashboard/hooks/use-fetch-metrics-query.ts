import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@shared/constants'

import type { AnalyticsResponse, MetricsQueryParams } from '../model'
import { fetchMetrics } from '../api'

export const useFetchMetricsQuery = <TResponseBody extends AnalyticsResponse>(queryParams: MetricsQueryParams) => {
    const { isPending, data, error } = useQuery({
        queryKey: [QUERY_KEYS.METRICS, queryParams],
        queryFn: () => fetchMetrics<TResponseBody>(queryParams),
        placeholderData: keepPreviousData,
        enabled:
            (queryParams.group === 'Employee-Analytics' ? !!queryParams.email : true) &&
            !!(queryParams?.date_to && queryParams?.date_from),
    })

    return { isPending, data, error }
}
