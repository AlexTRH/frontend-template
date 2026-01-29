import type { Payload } from 'recharts/types/component/DefaultLegendContent'
import type { PieLabelRenderProps } from 'recharts'
import { LabelList, Pie, PieChart } from 'recharts'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import { cn } from '@shared/lib/ui'
import { type ChartPalette, convertChartDataToConfig, createChartData } from '@shared/lib/chart'

function RenderPercentageLabel(props: PieLabelRenderProps) {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    const cxNum = Number(cx)
    const cyNum = Number(cy)
    const midAngleNum = Number(midAngle)
    const innerRadiusNum = Number(innerRadius)
    const outerRadiusNum = Number(outerRadius)

    if (isNaN(cxNum) || isNaN(cyNum) || isNaN(midAngleNum) || isNaN(innerRadiusNum) || isNaN(outerRadiusNum)) {
        return null
    }

    const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.6
    const x = cxNum + radius * Math.cos(-midAngleNum * (Math.PI / 180))
    const y = cyNum + radius * Math.sin(-midAngleNum * (Math.PI / 180))

    return (
        <text x={x} y={y} fill="var(--background)" textAnchor="middle" dominantBaseline="central" fontSize={12}>
            {percent}
        </text>
    )
}

type Props = {
    percentage?: Record<string, AnalyticsRate>
    palette?: ChartPalette
    withLegend?: boolean
    tooltipUnit?: string | null
    labelFormatter?: (value: number) => void
}

export function PieCartLabel({
    percentage = {},
    palette = 'colorful',
    withLegend = false,
    tooltipUnit,
    labelFormatter,
}: Props) {
    const notNullablePercentage = Object.fromEntries(
        Object.entries(percentage).filter(([, value]) => value !== '0')
    ) as Record<string, AnalyticsRate>
    const chartData = createChartData(notNullablePercentage, { palette })
    const chartConfig = convertChartDataToConfig(chartData)
    const pieData = chartData.map((item) => ({
        ...item,
        percent: labelFormatter ? labelFormatter(item.rate) : item.rate,
    }))
    const payload: Array<Payload> = chartData.map((data) => ({
        value: data.title,
        color: data.fill,
    }))
    return (
        <ChartContainer config={chartConfig}>
            <PieChart className={cn('', withLegend && 'xl:relative xl:right-20')}>
                <ChartTooltip content={<ChartTooltipContent hideLabel unit={tooltipUnit} />} />
                <Pie data={pieData} dataKey="rate" nameKey="title" label={RenderPercentageLabel} labelLine={false}>
                    {!withLegend && (
                        <LabelList
                            dataKey="title"
                            position="outside"
                            fontSize={12}
                            offset={10}
                            stroke="none"
                            fill="var(--muted-foreground)"
                        />
                    )}
                </Pie>
                {withLegend && (
                    <ChartLegend
                        payload={payload}
                        content={
                            <ChartLegendContent className="items-start ml-auto xl:flex xl:w-1/2 xl:flex-col xl:gap-3 xl:absolute xl:-right-40 xl:bottom-6" />
                        }
                        verticalAlign="bottom"
                        align="center"
                    />
                )}
            </PieChart>
        </ChartContainer>
    )
}
