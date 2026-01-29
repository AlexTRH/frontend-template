import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Calendar, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { format } from 'date-fns'
import {
    Button,
    DatePicker,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@shared/ui'
import { getMonthDateRange, getWeekDateRange, getYearDateRange } from '@shared/lib/date'
import { useDateFromToSearchParam } from '@shared/hooks'

type DateRangeType = 'week' | 'month' | 'year' | 'specific'

const DATE_OPTIONS: Record<
    DateRangeType,
    { title: string; value?: { date_from: string; date_to: string }; onSelect?: (event: Event) => void }
> = {
    week: {
        title: 'Last week',
        value: getWeekDateRange(),
    },
    month: {
        title: ' Last month',
        value: getMonthDateRange(),
    },
    year: {
        title: 'Last year',
        value: getYearDateRange(),
    },
    specific: {
        title: 'Specific date range',
        onSelect: (e) => e.preventDefault(),
    },
}

export function SelectDateRangeQuery() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dateRange = (searchParams.get('date_range') as DateRangeType) || 'month'
    const { date_from, date_to } = useDateFromToSearchParam()

    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<DateRangeType>(dateRange)

    const setParams = ({ date_from, date_to }: { date_from?: string; date_to?: string }) => {
        if (date_from) {
            searchParams.set('date_from', date_from)
        }
        if (date_to) {
            searchParams.set('date_to', date_to)
        }
        setSearchParams(searchParams)
    }

    const onCheckedChange = (key: DateRangeType) => {
        if (key !== 'specific') {
            searchParams.set('date_from', DATE_OPTIONS[key].value?.date_from as string)
            searchParams.set('date_to', DATE_OPTIONS[key].value?.date_to as string)
        }
        searchParams.set('date_range', key)
        setSearchParams(searchParams)
        setSelected(key)
    }

    return (
        <DropdownMenu onOpenChange={setOpen} open={open}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-primary hover:text-primary">
                    <Calendar className="size-[18px]" />
                    <span>
                        {selected === 'specific'
                            ? `${format(date_from, 'LLL dd, y')} - ${format(date_to, 'LLL dd, y')}`
                            : DATE_OPTIONS[selected].title}
                    </span>
                    {open ? <ChevronUpIcon className="size-[18px]" /> : <ChevronDownIcon className="size-[18px]" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-68" align="end">
                {Object.entries(DATE_OPTIONS).map(([key, value]) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={selected === key}
                        onCheckedChange={() => onCheckedChange(key as DateRangeType)}
                        onSelect={value.onSelect}
                    >
                        {value.title}
                    </DropdownMenuCheckboxItem>
                ))}
                {selected === 'specific' && (
                    <div className="flex justify-between gap-1 px-1 py-2">
                        <div className="w-full flex flex-col gap-y-2">
                            <span className="text-sm text-muted-foreground font-medium">FROM</span>
                            <DatePicker dateParamName="date_from" date={date_from} setParams={setParams} />
                        </div>
                        <div className="w-full flex flex-col gap-y-2">
                            <span className="text-sm text-muted-foreground font-medium">TO</span>
                            <DatePicker dateParamName="date_to" date={date_to} setParams={setParams} />
                        </div>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
