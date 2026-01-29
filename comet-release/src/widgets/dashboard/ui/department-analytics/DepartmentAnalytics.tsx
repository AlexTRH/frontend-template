import { ChartNoAxesColumnIncreasing, Clock } from 'lucide-react'
import { GridMapperSkeleton } from '@shared/ui/skeletons'
import { GridMapper } from '@shared/ui/grid-mapper'
import { Error } from '@shared/ui/errors'
import { BarChartHorizontal, BarChartVertical, PieCartLabel, PieChartDonut, RadialChartShape } from '@shared/ui/charts'
import { Average } from '@shared/ui/average'
import { convertDaysToDHM, formatToPercentage } from '@shared/lib/chart'
import { useDateFromToSearchParam } from '@shared/hooks'
import { useDepartmentSearchParam } from '@entities/catalogs/department'

import type { DepartmentsAnalytics } from '../../model'
import { generateFullGradeList } from '../../lib'
import { useFetchMetricsQuery } from '../../hooks'

export function DepartmentAnalytics() {
    const department = useDepartmentSearchParam()
    const { date_from, date_to } = useDateFromToSearchParam()
    const { data, error, isPending } = useFetchMetricsQuery<DepartmentsAnalytics>({
        group: 'Department-Analytics',
        date_from,
        date_to,
    })

    const getConfig = (data: DepartmentsAnalytics) => {
        const departmentData = data[department]
        return [
            {
                columns: [
                    {
                        average: (
                            <Average
                                variant="success"
                                title="Average time to customer feedback"
                                count={convertDaysToDHM(departmentData?.avg_feedback_days || '0')}
                                icon={<Clock />}
                            />
                        ),
                    },
                    {
                        average: (
                            <Average
                                variant="destructive"
                                title="Average time from request to rejection"
                                count={convertDaysToDHM(departmentData?.average_rejection_days)}
                                icon={<Clock />}
                            />
                        ),
                    },
                    {
                        average: (
                            <Average
                                variant="info"
                                title="Average number of interview steps"
                                count={departmentData?.avg_interview_stages_per_position}
                                icon={<ChartNoAxesColumnIncreasing />}
                            />
                        ),
                    },
                ],
            },
            {
                columns: [
                    {
                        title: 'Conversion',
                        card: (
                            <RadialChartShape
                                percent={departmentData?.conversion_rate_requests}
                                label="approved requests"
                                fill="var(--chart-15)"
                            />
                        ),
                    },
                    {
                        title: 'Skipped Requests',
                        card: (
                            <PieChartDonut
                                percentage={{
                                    ['Skipped']: departmentData?.skipped_requests || '0',
                                    ['Not skipped']: departmentData?.non_skipped_requests || '0',
                                }}
                                inner_text="skipped requests"
                                inner_amount={departmentData && formatToPercentage(departmentData?.skipped_requests)}
                                labelFormatter={formatToPercentage}
                            />
                        ),
                    },
                    {
                        title: 'Successful completion of interviews by type',
                        card: (
                            <PieChartDonut
                                percentage={departmentData?.success_rate_by_type}
                                with_label
                                labelFormatter={formatToPercentage}
                            />
                        ),
                    },
                ],
            },
            {
                columns: [
                    {
                        title: 'Location',
                        card: <BarChartHorizontal percentage={departmentData?.request_location_percentage} />,
                    },
                    {
                        title: 'Customer requests',
                        card: (
                            <PieCartLabel
                                percentage={departmentData?.request_customer_percentage}
                                labelFormatter={formatToPercentage}
                            />
                        ),
                    },
                    {
                        title: 'Intermediary requests',
                        card: (
                            <PieCartLabel
                                percentage={departmentData?.request_intermediary_percentage}
                                labelFormatter={formatToPercentage}
                            />
                        ),
                    },
                ],
            },
            {
                columns: [
                    {
                        title: 'Reasons of rejection',
                        card: <BarChartHorizontal percentage={departmentData?.rejection_reasons} />,
                    },
                    {
                        title: 'Montly conversion',
                        card: (
                            <BarChartVertical
                                percentage={departmentData?.monthly_conversion}
                                fill="var(--chart-17)"
                                extra_fill="var(--chart-6)"
                                formatter={formatToPercentage}
                            />
                        ),
                    },
                ],
            },

            {
                columns: [
                    {
                        title: 'Request Grade',
                        card: (
                            <BarChartVertical
                                percentage={generateFullGradeList(departmentData?.request_grade_percentage)}
                                fill="var(--chart-6)"
                                formatter={formatToPercentage}
                            />
                        ),
                    },
                    {
                        title: 'Interview Grade',
                        card: (
                            <BarChartVertical
                                percentage={generateFullGradeList(departmentData?.interview_grade_percentage)}
                                fill="var(--chart-12)"
                                formatter={formatToPercentage}
                            />
                        ),
                    },
                ],
            },
        ]
    }

    if (isPending) return <GridMapperSkeleton />
    if (data) return <GridMapper getConfig={getConfig} data={data} />
    if (error) return <Error description={error.message} />
}
