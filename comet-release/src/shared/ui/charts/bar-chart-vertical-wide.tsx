import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import type { ReactNode } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import { convertChartDataToConfig, createChartData, formatToPercentage } from '@shared/lib/chart'

type Props = {
    percentage?: Record<string, AnalyticsRate>
    fill: string
    extra_fill?: string
    formatter?: (value: number | string) => void
    gradientSlot?: ReactNode
}

export function BarChartVerticalWide({ percentage = {}, fill, extra_fill, formatter, gradientSlot }: Props) {
    const chartData = createChartData(percentage, { fill, extra_fill })
    const chartConfig = convertChartDataToConfig(chartData)

    return (
        <ChartContainer config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={chartData}
                barCategoryGap={2}
                margin={{
                    top: 0,
                    bottom: 30,
                }}
            >
                {gradientSlot}
                <CartesianGrid vertical={false} horizontal={false} />
                <XAxis
                    dataKey="title"
                    tickLine={false}
                    axisLine={false}
                    fontSize={18}
                    interval="preserveStartEnd"
                    tickMargin={35}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            nameKey="title"
                            formatter={(value) => <span>{formatToPercentage(value as string)}</span>}
                        />
                    }
                />
                <Bar dataKey="rate" radius={0}>
                    <LabelList
                        position="bottom"
                        className="fill-foreground"
                        fontSize={24}
                        fontWeight={500}
                        formatter={formatter}
                        offset={16}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
