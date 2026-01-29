import { DayPicker } from 'react-day-picker'
import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, buttonVariants } from '@shared/ui/button'
import { cn } from '@shared/lib/ui/cn'

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                month: 'flex flex-col gap-4',
                month_caption: 'flex justify-center pt-1 relative items-center w-full',
                caption_label: 'text-sm font-medium',
                nav: 'relative',
                button_previous: cn(
                    buttonVariants({ variant: 'outline' }),
                    'z-10 absolute size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground border-foreground'
                ),
                button_next: cn(
                    buttonVariants({ variant: 'outline' }),
                    'z-10 absolute right-0 size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground border-foreground'
                ),
                month_grid: 'w-full border-collapse space-x-1',
                weekdays: 'flex',
                weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
                week: 'flex w-full mt-2',
                day: cn(
                    'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
                    props.mode === 'range'
                        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                        : '[&:has([aria-selected])]:rounded-md'
                ),
                day_button: cn(
                    buttonVariants({ variant: 'ghost' }),
                    'size-8 p-0 font-normal aria-selected:opacity-100'
                ),
                range_start:
                    'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground rounded-l-md',
                range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground rounded-r-md',
                selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                today: 'bg-input text-accent-foreground',
                outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
                disabled: 'text-muted-foreground opacity-50',
                range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                hidden: 'invisible',
                ...classNames,
            }}
            components={{
                Chevron: (props) => {
                    if (props.orientation === 'left') {
                        return <ChevronLeft className={cn('size-4', className)} {...props} />
                    }
                    return <ChevronRight className={cn('size-4', className)} {...props} />
                },
                NextMonthButton: (props) => {
                    return <Button {...props} />
                },
                PreviousMonthButton: (props) => {
                    return <Button {...props} />
                },
            }}
            {...props}
        />
    )
}

export { Calendar }
