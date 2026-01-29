import type { Payload } from 'recharts/types/component/DefaultLegendContent'
import type { ChartConfig } from '@shared/ui/chart'

export const convertChartConfigToPayload = (chartConfig: ChartConfig): Array<Payload> => {
    return Object.entries(chartConfig).map(([key, config]) => ({
        value: config.label,
        color: config.color,
        dataKey: key,
    }))
}
