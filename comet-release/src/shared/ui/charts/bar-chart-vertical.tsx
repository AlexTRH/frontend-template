import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import { convertChartDataToConfig, createChartData } from '@shared/lib/chart'

type Props = {
    percentage?: Record<string, AnalyticsRate>
    fill: string
    extra_fill?: string
    formatter?: (value: AnalyticsRate) => void
}

export function BarChartVertical({ percentage = {}, fill, extra_fill, formatter }: Props) {
    const chartData = createChartData(percentage, { fill, extra_fill })
    const chartConfig = convertChartDataToConfig(chartData)
    return (
        <ChartContainer config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="title"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    fontSize={12}
                    interval="preserveStartEnd"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="title" />} />
                <Bar dataKey="rate" radius={8} maxBarSize={100}>
                    <LabelList
                        position="top"
                        offset={10}
                        className="fill-foreground"
                        fontSize={12}
                        formatter={formatter}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
