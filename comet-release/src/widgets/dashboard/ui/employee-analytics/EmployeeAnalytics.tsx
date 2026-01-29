import { Error } from '@shared/ui/errors'
import { GridMapper, GridMapperSkeleton, PieCartLabel, PieChartDonut } from '@shared/ui'
import { useDateFromToSearchParam } from '@shared/hooks'

import type { EmployeeAnalytics } from '../../model'
import { useEmailSearchParam, useFetchMetricsQuery } from '../../hooks'

export function EmployeeAnalytics() {
    const { email } = useEmailSearchParam()
    const { date_from, date_to } = useDateFromToSearchParam()
    const { data, error, isPending } = useFetchMetricsQuery<EmployeeAnalytics>({
        group: 'Employee-Analytics',
        email,
        date_from,
        date_to,
    })

    const getConfig = (data: EmployeeAnalytics) => {
        const { requests, request_position_by_status, request_positions_by_verdict, interviews } = data

        return [
            {
                columns: [
                    {
                        title: 'Requests',
                        description: '1 July 2025 - 31 July',
                        card: (
                            <PieChartDonut
                                percentage={{
                                    Processing: requests.processing,
                                    Other: String(Number(requests.total) - Number(requests.processing)),
                                }}
                                inner_text="total requests"
                                inner_amount={requests.total}
                                tooltipUnit={null}
                            />
                        ),
                    },
                    {
                        title: 'Request Positions',
                        description: '1 July 2025 - 31 July',
                        card: (
                            <PieChartDonut
                                percentage={{
                                    Approved: request_position_by_status.approved,
                                    Rejected: request_position_by_status.rejected,
                                    Processing: request_position_by_status.processing,
                                }}
                                with_label
                                labelPosition="outside"
                                inner_text="request positions"
                                inner_amount={request_position_by_status.total}
                                tooltipUnit={null}
                            />
                        ),
                    },
                ],
            },
            {
                columns: [
                    {
                        title: 'Interviews By Status',
                        description: '1 July 2025 - 31 July',
                        card: (
                            <PieChartDonut
                                percentage={{
                                    Approved: interviews.approved,
                                    Reject: interviews.reject,
                                    Canceled: interviews.canceled,
                                    Going: interviews.going,
                                    Pending: interviews.pending,
                                    Scheduled: interviews.scheduled,
                                }}
                                with_label
                                labelPosition="outside"
                                inner_text="interviews"
                                inner_amount={interviews.total}
                                tooltipUnit={null}
                            />
                        ),
                    },
                    {
                        title: 'Request Positions By Verdict',
                        description: '1 July 2025 - 31 July',
                        card: (
                            <PieCartLabel
                                percentage={{
                                    Approved: request_positions_by_verdict.approved,
                                    Rejected: request_positions_by_verdict.rejected,
                                }}
                                palette="blue"
                                withLegend
                                tooltipUnit={null}
                            />
                        ),
                    },
                ],
            },
        ]
    }
    if (email && isPending) return <GridMapperSkeleton rows={[{ columns: 2 }, { columns: 2 }]} />
    if (data) return <GridMapper getConfig={getConfig} data={data} />
    if (error) return <Error description={error.message} />
}
