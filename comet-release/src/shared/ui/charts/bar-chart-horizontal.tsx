import type { Payload } from 'recharts/types/component/DefaultLegendContent'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import { convertChartDataToConfig, createChartData, formatToPercentage } from '@shared/lib/chart'

type Props = {
    percentage?: Record<string, AnalyticsRate>
}
export function BarChartHorizontal({ percentage = {} }: Props) {
    const chartData = createChartData(percentage, { palette: 'monochrome' })
    const chartConfig = convertChartDataToConfig(chartData)
    const payload: Array<Payload> = chartData.map((data) => ({
        value: data.title,
        color: data.fill,
    }))

    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ right: 50 }}>
                <YAxis
                    dataKey="title"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string) => value.slice(0, 3)}
                    hide
                />
                <XAxis dataKey="rate" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel nameKey="title" />}
                />
                <Bar dataKey="rate" layout="vertical" radius={4} maxBarSize={60} minPointSize={0.5}>
                    <LabelList
                        dataKey="rate"
                        position="right"
                        offset={4}
                        className="fill-foreground"
                        fontSize={12}
                        formatter={formatToPercentage}
                    />
                </Bar>
                <ChartLegend content={<ChartLegendContent />} payload={payload} />
            </BarChart>
        </ChartContainer>
    )
}
