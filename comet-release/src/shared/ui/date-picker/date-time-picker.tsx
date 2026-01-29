import type { ChangeEvent } from 'react'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { InputWithIcon } from '@shared/ui/with'
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover'
import { Calendar } from '@shared/ui/calendar'
import { Button } from '@shared/ui/button'
import { cn } from '@shared/lib/ui/cn'
import { formatDateToDTO, getCurrentDateTime, parseDate } from '@shared/lib/date'

type Props = {
    id?: string
    onChange: (value?: string) => void
    value?: string
    disabled?: boolean
}

export function DateTimePicker({ id, onChange, value, disabled = false }: Props) {
    const parsedValue = parseDate(value)

    function handleDateSelect(date: Date | undefined) {
        if (date) {
            const newDate = new Date(date)

            if (parsedValue instanceof Date) {
                newDate.setHours(parsedValue.getHours())
                newDate.setMinutes(parsedValue.getMinutes())
            }
            onChange(formatDateToDTO(newDate))
        }
    }

    const handleTimeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            return
        }
        const [hoursStr, minutesStr] = value.split(':')
        const hours = parseInt(hoursStr, 10)
        const minutes = parseInt(minutesStr, 10)
        if (isNaN(hours) || isNaN(minutes)) {
            return
        }
        const date = parsedValue || getCurrentDateTime()
        date.setHours(hours)
        date.setMinutes(minutes)
        onChange(formatDateToDTO(date))
    }

    return (
        <div className="flex gap-4">
            <Popover>
                <PopoverTrigger
                    id={id}
                    asChild
                    className="border-input bg-transparent hover:bg-accent"
                    disabled={disabled}
                >
                    <Button
                        variant="outline"
                        className={cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground')}
                    >
                        {parsedValue ? format(parsedValue, 'dd.MM.yyyy') : <span>MM.DD.YYYY</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={parsedValue} onSelect={handleDateSelect} autoFocus />
                </PopoverContent>
            </Popover>
            <InputWithIcon
                type="time"
                id={id}
                value={parsedValue ? format(parsedValue, 'HH:mm') : ''}
                onChange={handleTimeInputChange}
                className="time-reset"
                disabled={disabled}
                icon={<Clock className="h-4 w-4" />}
            />
        </div>
    )
}
