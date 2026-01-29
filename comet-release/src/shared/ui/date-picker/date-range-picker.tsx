import type { DateRange } from 'react-day-picker'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover'
import { Calendar } from '@shared/ui/calendar'
import { Button } from '@shared/ui/button'
import type { QueryParamsPayload, WithClassName } from '@shared/types'
import { cn } from '@shared/lib/ui'

type Props = {
    date_from?: string
    date_to?: string
    setParams: (params: QueryParamsPayload) => void
}

export function DateRangePicker({ className, date_to, date_from, setParams }: Props & WithClassName) {
    const from = date_from ? new Date(date_from) : undefined
    const to = date_to ? new Date(date_to) : undefined
    const date: DateRange | undefined = {
        from,
        to,
    }

    const handleSelectDate = (date: DateRange | undefined) => {
        if (date?.from) {
            setParams({ date_from: format(date.from, 'yyyy-LL-dd') })
        }
        if (date?.to) {
            setParams({ date_to: format(date.to, 'yyyy-LL-dd') })
        }
        if (!date) {
            setParams({ date_from: undefined, date_to: undefined })
        }
        setParams({ offset: 0 })
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        size="sm"
                        className={cn(
                            'border-border justify-between text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span className="text-secondary-foreground">Pick a date</span>
                        )}
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        autoFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelectDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
