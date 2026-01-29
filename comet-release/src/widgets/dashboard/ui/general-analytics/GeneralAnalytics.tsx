import { Clock } from 'lucide-react'
import { GridMapperSkeleton } from '@shared/ui/skeletons'
import { GridMapper } from '@shared/ui/grid-mapper'
import { Error } from '@shared/ui/errors/error'
import {
    BarChartHorizontal,
    BarChartVertical,
    BarChartVerticalWide,
    PieCartLabel,
    RadialChartStacked,
} from '@shared/ui/charts'
import { Average } from '@shared/ui/average'
import { convertDaysToDHM, formatToPercentage } from '@shared/lib/chart'
import { useDateFromToSearchParam } from '@shared/hooks'

import type { GeneralAnalytics } from '../../model'
import { generateFullGradeList } from '../../lib'
import { useFetchMetricsQuery } from '../../hooks'
import { GENERAL_SKIPPED_REQUEST_CONFIG } from '../../config'

export function GeneralAnalytics() {
    const { date_from, date_to } = useDateFromToSearchParam()
    const { data, error, isPending } = useFetchMetricsQuery<GeneralAnalytics>({
        group: 'Dashboard',
        date_from,
        date_to,
    })
    const getConfig = (data: GeneralAnalytics) => {
        const {
            average_duration_days,
            request_location_percentage,
            request_customer_percentage,
            request_grade_percentage,
            interview_grade_percentage,

            conversion_rate,
            conversion_request,
            conversion_request_position,
            conversion_interviews,
            skipped_requests,
        } = data
        return [
            {
                columns: [
                    {
                        title: 'Conversion',
                        card: (
                            <BarChartVerticalWide
                                percentage={{
                                    Request: conversion_request,
                                    'Request Position': conversion_request_position,
                                    Interviews: conversion_interviews,
                                    Rate: conversion_rate,
                                }}
                                fill="url(#gradientChartColor)"
                                formatter={formatToPercentage}
                                gradientSlot={
                                    <defs>
                                        <linearGradient id="gradientChartColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6A88EB" stopOpacity={1} />
                                            <stop offset="95%" stopColor="#1B91F0" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                }
                            />
                        ),
                    },
                ],
            },
            {
                columns: [
                    {
                        title: 'Skipped Requests',
                        card: (
                            <RadialChartStacked
                                chartConfig={GENERAL_SKIPPED_REQUEST_CONFIG}
                                percent={skipped_requests}
                                label="requests"
                            />
                        ),
                        average: (
                            <Average
                                title="Average time from request to rate"
                                count={convertDaysToDHM(average_duration_days)}
                                icon={<Clock />}
                            />
                        ),
                    },
                    {
                        title: 'Location',
                        card: <BarChartHorizontal percentage={request_location_percentage} />,
                    },
                    {
                        title: 'Customer requests',
                        card: (
                            <PieCartLabel
                                percentage={request_customer_percentage}
                                labelFormatter={formatToPercentage}
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
                                percentage={generateFullGradeList(request_grade_percentage)}
                                fill="var(--chart-5)"
                                formatter={formatToPercentage}
                            />
                        ),
                    },
                    {
                        title: 'Interview Grade',
                        card: (
                            <BarChartVertical
                                percentage={generateFullGradeList(interview_grade_percentage)}
                                fill="var(--chart-12)"
                                formatter={formatToPercentage}
                            />
                        ),
                    },
                ],
            },
        ]
    }
    if (isPending) return <GridMapperSkeleton rows={[{ columns: 1 }, { columns: 3 }, { columns: 2 }]} />
    if (data) return <GridMapper getConfig={getConfig} data={data} />
    if (error) return <Error description={error.message} />
}
