import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { Button } from '@shared/ui/button'
import type { QueryParamsPayload } from '@shared/types'
import { useIsMobile } from '@shared/hooks'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

interface DataTablePaginationProps {
    total: number
    limit: number
    offset: number
    setParams: (params: QueryParamsPayload) => void
}

export function DataTablePagination({ total, limit, offset, setParams }: DataTablePaginationProps) {
    const isMobile = useIsMobile()
    const pageCount = Math.ceil(total / limit) || 1
    const currentPage = Math.ceil(offset / limit) + 1

    const handleChangeQuery = ({ limit, offset }: { limit?: number; offset?: number }) => {
        if (limit !== undefined) {
            setParams({ limit })
        }
        if (offset !== undefined) {
            setParams({ offset })
        }
    }

    if (isMobile) {
        return (
            <Button
                variant="outline"
                onClick={() =>
                    handleChangeQuery({ offset: DEFAULT_PAGINATION_OFFSET, limit: limit + DEFAULT_PAGINATION_LIMIT })
                }
                disabled={currentPage === pageCount}
                className="w-full"
            >
                Load More
            </Button>
        )
    }

    return (
        <div className="flex items-center justify-end px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={limit.toString()}
                        onValueChange={(limit) => {
                            handleChangeQuery({ offset: DEFAULT_PAGINATION_OFFSET, limit: Number(limit) })
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={limit} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {['10', '20', '30', '40', '50'].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of {pageCount}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handleChangeQuery({ offset: DEFAULT_PAGINATION_OFFSET, limit })}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleChangeQuery({ offset: offset - limit })}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleChangeQuery({ offset: offset + limit })}
                        disabled={currentPage === pageCount}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handleChangeQuery({ offset: limit * (pageCount - 1) })}
                        disabled={currentPage === pageCount}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
