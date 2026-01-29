import { useSearchParams } from 'react-router-dom'
import type { DateRange } from '@shared/lib/date'
import { getMonthDateRange } from '@shared/lib/date'

export const useDateFromToSearchParam = (): DateRange => {
    const [searchParams] = useSearchParams()
    const date_from = searchParams.get('date_from') || getMonthDateRange().date_from
    const date_to = searchParams.get('date_to') || getMonthDateRange().date_to
    return { date_from, date_to }
}
