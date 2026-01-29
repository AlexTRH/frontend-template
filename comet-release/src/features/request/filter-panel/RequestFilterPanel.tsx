import { useState } from 'react'
import { Funnel } from 'lucide-react'
import { SelectParamNested } from '@shared/ui/selects'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@shared/ui/dropdown-menu'
import { DateRangePicker } from '@shared/ui/date-picker'
import { Button } from '@shared/ui/button'
import { BadgeClosable } from '@shared/ui/badge-closable'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui/accordion'
import type { QueryParamsPayload } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'
import { Accordion } from '@radix-ui/react-accordion'
import type { RequestsParams } from '@entities/request'
import { RequestStatusConfig } from '@entities/request'
import { DepartmentConfig } from '@entities/catalogs'

import { FilterByCreator } from './ui'

const defaultParams = {
    limit: DEFAULT_PAGINATION_LIMIT,
    offset: DEFAULT_PAGINATION_OFFSET,
    request_creator: 'my',
    search: undefined,
    date_from: undefined,
    date_to: undefined,
    status: undefined,
    department: undefined,
}

type Props = {
    params: RequestsParams
    setParams: (param: QueryParamsPayload) => void
}
export function RequestFilterPanel({ params, setParams }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const status = params.status
    const dateFrom = params.date_from
    const dateTo = params.date_to
    const department = params.department
    const creators = params.request_creator.split(',')

    const clearAllFilters = () => {
        setParams(defaultParams)
        setOpen(false)
    }

    const removeCreator = (request_creator: string) => {
        const filteredCreators = creators.filter((creator) => creator !== request_creator).join(',')
        setParams({
            request_creator: filteredCreators || 'all',
        })
    }

    const removeParam = (param: keyof RequestsParams) => {
        setParams({ [param]: undefined })
    }

    return (
        <DropdownMenu onOpenChange={setOpen} open={open}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Funnel />
                    <span className="text-muted-foreground">Filter By</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-68 p-3 pb-0" align="start">
                <DropdownMenuLabel className="flex justify-between px-0">
                    Filter By
                    <Button variant="none" size="auto" onClick={clearAllFilters}>
                        Clear All
                    </Button>
                </DropdownMenuLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                    <BadgeClosable variant="outline" onClick={() => removeParam('status')} closable={!!status}>
                        {status ? RequestStatusConfig[status] : 'All Statuses'}
                    </BadgeClosable>
                    <BadgeClosable variant="outline" onClick={() => removeParam('department')} closable={!!department}>
                        {department ? DepartmentConfig[department] : 'All Departments'}
                    </BadgeClosable>
                    {creators.map((creator) => (
                        <BadgeClosable
                            key={creator}
                            variant="outline"
                            onClick={() => removeCreator(creator)}
                            closable={creator !== 'all'}
                            className={creator === 'all' || creator === 'my' ? 'capitalize' : ''}
                        >
                            {creator}
                        </BadgeClosable>
                    ))}
                </div>
                <Accordion type="single" collapsible className="w-full" defaultValue={(dateFrom || dateTo) && 'date'}>
                    <AccordionItem value="date">
                        <AccordionTrigger>Date</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <DateRangePicker date_from={dateFrom} date_to={dateTo} setParams={setParams} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="status">
                        <AccordionTrigger>Status</AccordionTrigger>
                        <AccordionContent className="relative flex flex-col gap-4 text-balance">
                            <SelectParamNested
                                config={RequestStatusConfig}
                                param="status"
                                setParams={setParams}
                                value={status}
                                allOption
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="department">
                        <AccordionTrigger>Department</AccordionTrigger>
                        <AccordionContent className="relative flex flex-col gap-4 text-balance">
                            <SelectParamNested
                                config={DepartmentConfig}
                                param="department"
                                setParams={setParams}
                                value={department}
                                allOption
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="creator">
                        <AccordionTrigger>Creator</AccordionTrigger>
                        <AccordionContent className="relative flex flex-col gap-4 text-balance">
                            <FilterByCreator request_creator={params.request_creator} setParams={setParams} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
