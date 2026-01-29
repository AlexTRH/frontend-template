import { customFetchJson } from '@shared/lib/fetch'

import type { AnalyticsResponse, MetricsQueryParams } from '../model'

export const fetchMetrics = async <TResponseBody extends AnalyticsResponse>(queryParams: MetricsQueryParams) => {
    return await customFetchJson<void, TResponseBody>('/v1/metrics', { queryParams })
}
