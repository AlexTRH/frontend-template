import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover'
import { Calendar } from '@shared/ui/calendar'
import { Button } from '@shared/ui/button'
import type { QueryParamsPayload, WithClassName } from '@shared/types'
import { cn } from '@shared/lib/ui'

type Props = {
    date?: string
    dateParamName: string
    setParams: (params: QueryParamsPayload) => void
}

export function DatePicker({ className, dateParamName, date, setParams }: Props & WithClassName) {
    const [open, setOpen] = useState<boolean>(false)

    const newDate = date ? new Date(date) : undefined

    const handleSelectDate = (date: Date | undefined) => {
        if (date) {
            setParams({ [dateParamName]: format(date, 'yyyy-LL-dd') })
        }
        setParams({ offset: 0 })
        setOpen(false)
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        size="sm"
                        className={cn(
                            'border-border justify-between text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                        onClick={(prev) => setOpen(!prev)}
                    >
                        {date ? (
                            format(date, 'LLL dd, y')
                        ) : (
                            <span className="text-secondary-foreground">Pick a date</span>
                        )}
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        autoFocus
                        mode="single"
                        defaultMonth={newDate}
                        selected={newDate}
                        onSelect={handleSelectDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
