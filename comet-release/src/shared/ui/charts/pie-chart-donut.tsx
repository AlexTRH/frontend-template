import type { LabelPosition } from 'recharts/types/component/Label'
import type { Payload } from 'recharts/types/component/DefaultLegendContent'
import { Label, LabelList, Pie, PieChart } from 'recharts'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import type { ChartPalette } from '@shared/lib/chart'
import { convertChartDataToConfig, createChartData } from '@shared/lib/chart'

type Props<T extends string> = {
    inner_text?: string
    inner_amount?: string | number
    percentage?: Record<T, AnalyticsRate>
    with_label?: boolean
    palette?: ChartPalette
    labelPosition?: LabelPosition
    labelFormatter?: (value: number) => void
    tooltipUnit?: string | null
}

export function PieChartDonut<T extends string>({
    inner_text,
    percentage = {} as Record<T, AnalyticsRate>,
    inner_amount,
    with_label,
    palette = 'donut',
    labelPosition = 'inside',
    labelFormatter,
    tooltipUnit,
}: Props<T>) {
    const notNullablePercentage = Object.fromEntries(
        Object.entries(percentage).filter(([, value]) => value !== '0')
    ) as Record<T, AnalyticsRate>
    const chartData = createChartData(notNullablePercentage, { palette })
    const chartConfig = convertChartDataToConfig(chartData)
    const payload: Array<Payload> = chartData.map((data) => ({
        value: data.title,
        color: data.fill,
    }))

    return (
        <ChartContainer config={chartConfig}>
            <PieChart className="xl:relative xl:right-20">
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel unit={tooltipUnit} />} />
                <Pie
                    data={chartData}
                    dataKey="rate"
                    nameKey="title"
                    innerRadius={65}
                    outerRadius={100}
                    strokeWidth={5}
                    labelLine={false}
                >
                    {with_label && (
                        <LabelList
                            dataKey="rate"
                            position={labelPosition}
                            fontSize={12}
                            offset={10}
                            stroke="none"
                            fill="var(--foreground)"
                            formatter={labelFormatter}
                        />
                    )}
                    {inner_text && inner_amount !== undefined && (
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-3xl font-bold"
                                            >
                                                {inner_amount}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {inner_text}
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    )}
                </Pie>
                <ChartLegend
                    payload={payload}
                    content={
                        <ChartLegendContent className="items-start ml-auto xl:flex xl:w-1/2 xl:flex-col xl:gap-3 xl:absolute xl:-right-40 xl:bottom-6" />
                    }
                    verticalAlign="bottom"
                    align="center"
                />
            </PieChart>
        </ChartContainer>
    )
}
