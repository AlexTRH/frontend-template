import type { Payload } from 'recharts/types/component/DefaultLegendContent'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import type { ChartConfig } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'
import { convertChartConfigToPayload } from '@shared/lib/chart'

type Props = {
    percent: AnalyticsRate
    label: string
    chartConfig: ChartConfig
}

export function RadialChartStacked({ percent, chartConfig, label }: Props) {
    const payload: Array<Payload> = convertChartConfigToPayload(chartConfig)
    const chartData = [
        {
            active: 100 - Number(percent),
            inactive: percent,
        },
    ]

    return (
        <ChartContainer config={chartConfig}>
            <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) - 16}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {percent}%
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 4}
                                            className="fill-foreground text-xs"
                                        >
                                            {label}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
                {payload.map((config) => (
                    <RadialBar
                        key={config.dataKey as string}
                        dataKey={config.dataKey as string}
                        stackId="a"
                        cornerRadius={5}
                        fill={config.color}
                        className="stroke-transparent stroke-2"
                    />
                ))}
                <ChartLegend content={<ChartLegendContent />} payload={payload} />
            </RadialBarChart>
        </ChartContainer>
    )
}
