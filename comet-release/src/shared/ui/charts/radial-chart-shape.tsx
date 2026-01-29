import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { ChartContainer } from '@shared/ui/chart'
import type { AnalyticsRate } from '@shared/types'

type Props = {
    percent?: AnalyticsRate
    label?: string
    fill: string
}

export function RadialChartShape({ percent = '0', label, fill }: Props) {
    const chartData = [{ rate: percent, fill: fill }]
    return (
        <ChartContainer className="">
            <RadialBarChart
                data={chartData}
                endAngle={(Number(percent) / 100) * 360}
                innerRadius={80}
                outerRadius={160}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                />
                <RadialBar dataKey="rate" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {percent}%
                                        </tspan>
                                        {label && (
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {label}
                                            </tspan>
                                        )}
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    )
}
