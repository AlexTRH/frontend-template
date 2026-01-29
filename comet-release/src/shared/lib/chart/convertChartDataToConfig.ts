import type { ChartConfig } from '@shared/ui/chart'
import type { ChartData } from '@shared/types/chart'

export const convertChartDataToConfig = (chartData: ChartData[]): ChartConfig => {
    return chartData.reduce((acc, { title, fill }) => {
        acc[title] = {
            label: title,
            color: fill,
        }
        return acc
    }, {} as ChartConfig)
}
