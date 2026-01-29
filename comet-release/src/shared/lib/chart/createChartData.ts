import type { AnalyticsRate, ChartData } from '@shared/types/chart'

export type ChartPalette = 'monochrome' | 'colorful' | 'donut' | 'blue'

const CHART_PALETTE: Record<ChartPalette, string[]> = {
    monochrome: [
        'var(--chart-11)',
        'var(--chart-9)',
        'var(--chart-7)',
        'var(--chart-5)',
        'var(--chart-4)',
        'var(--chart-3)',
        'var(--chart-2)',
        'var(--chart-1)',
    ],
    colorful: [
        'var(--chart-15)',
        'var(--chart-14)',
        'var(--chart-13)',
        'var(--chart-12)',
        'var(--chart-11)',
        'var(--chart-8)',
        'var(--chart-6)',
        'var(--chart-4)',
        'var(--chart-2)',
    ],
    donut: [
        'var(--chart-3)',
        'var(--chart-11)',
        'var(--chart-13)',
        'var(--chart-14)',
        'var(--chart-15)',
        'var(--chart-12)',
        'var(--chart-8)',
        'var(--chart-2)',
        'var(--chart-6)',
    ],
    blue: ['var(--chart-6)', 'var(--chart-12)'],
}

export const createChartData = (
    data: Record<string, AnalyticsRate>,
    options?: { palette?: ChartPalette; fill?: string; extra_fill?: string; empty_fill?: string; empty_label?: string }
): ChartData[] => {
    const { palette, fill, extra_fill, empty_fill = 'var(--border)', empty_label = 'No data' } = options || {}
    const entries = Object.entries(data)

    // empty chart (no data)
    const total = entries.reduce((sum, [, rate]) => sum + Number(rate), 0)
    if (total === 0) {
        return [
            {
                title: empty_label,
                rate: 100,
                fill: empty_fill,
            },
        ]
    }

    const maxRate = Math.max(...entries.map(([, rate]) => Number(rate)))

    return entries.map(([title, rate], index) => {
        let appliedFill: string | undefined
        if (extra_fill && Number(rate) === maxRate) {
            appliedFill = extra_fill
        } else if (fill) {
            appliedFill = fill
        } else if (palette) {
            appliedFill = CHART_PALETTE[palette][index]
        }

        return {
            title,
            rate: Number(rate),
            fill: appliedFill,
        }
    })
}
