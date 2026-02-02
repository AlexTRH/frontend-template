import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Download, Inbox, Pencil, Search } from 'lucide-react'
import { TableSkeleton } from '@shared/ui/table-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { Pagination } from '@shared/ui/pagination'
import { Input } from '@shared/ui/input'
import { EmptyState } from '@shared/ui/empty-state'
import { ConfirmationWindowTrigger } from '@shared/ui/confirmation-window-trigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { Badge } from '@shared/ui/badge'
import { useDebounce } from '@shared/hooks'
import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { EditItemModal } from '@features/edit-item'
import { CreateItemModal } from '@features/create-item'
import type { Item, ItemStatus } from '@entities/item'
import { useDeleteItemsMutation, useItemsQuery } from '@entities/item'

const POLLING_INTERVAL_MS = 15_000
type SortField = 'title' | 'status' | 'createdAt'
type SortOrder = 'asc' | 'desc'

function escapeCsvCell(value: string): string {
    const hasCommaOrQuote = /[,"\n]/.test(value)
    return hasCommaOrQuote ? `"${value.replace(/"/g, '""')}"` : value
}

export function ItemsPage() {
    const { t } = useTranslation()
    const {
        data: items,
        isLoading,
        dataUpdatedAt,
    } = useItemsQuery({
        refetchInterval: POLLING_INTERVAL_MS,
    })
    const deleteItemsMutation = useDeleteItemsMutation()
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearch = useDebounce(searchQuery, 300)
    const [statusFilter, setStatusFilter] = useState<ItemStatus | 'all'>('all')
    const [page, setPage] = useState(0)
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const [sortBy, setSortBy] = useState<SortField>('createdAt')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const toggleSort = useCallback(
        (field: SortField) => {
            if (sortBy === field) {
                setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
            } else {
                setSortBy(field)
                setSortOrder('asc')
            }
            setPage(0)
        },
        [sortBy]
    )

    const filteredItems = useMemo(() => {
        if (!items) return []
        return items.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [items, debouncedSearch, statusFilter])

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems].sort((a, b) => {
            let cmp = 0
            if (sortBy === 'title') cmp = a.title.localeCompare(b.title)
            else if (sortBy === 'status') cmp = a.status.localeCompare(b.status)
            else if (sortBy === 'createdAt') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            return sortOrder === 'asc' ? cmp : -cmp
        })
        return sorted
    }, [filteredItems, sortBy, sortOrder])

    const paginatedItems = useMemo(() => {
        const start = page * DEFAULT_PAGINATION_LIMIT
        return sortedItems.slice(start, start + DEFAULT_PAGINATION_LIMIT)
    }, [sortedItems, page])

    const totalPages = Math.ceil(sortedItems.length / DEFAULT_PAGINATION_LIMIT) || 1

    const allOnPageSelected = paginatedItems.length > 0 && paginatedItems.every((i) => selectedIds.has(i.id))
    const someSelected = selectedIds.size > 0

    const toggleSelectAll = useCallback(() => {
        if (allOnPageSelected) {
            setSelectedIds((prev) => {
                const next = new Set(prev)
                paginatedItems.forEach((i) => next.delete(i.id))
                return next
            })
        } else {
            setSelectedIds((prev) => {
                const next = new Set(prev)
                paginatedItems.forEach((i) => next.add(i.id))
                return next
            })
        }
    }, [allOnPageSelected, paginatedItems])

    const toggleSelect = useCallback((id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }, [])

    const handleExportCsv = useCallback(() => {
        const headers = ['id', 'title', 'status', 'createdAt']
        const rows = sortedItems.map((i) =>
            [i.id, i.title, i.status, i.createdAt].map(String).map(escapeCsvCell).join(',')
        )
        const csv = [headers.join(','), ...rows].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `items-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }, [sortedItems])

    const handleDeleteSelected = useCallback(() => {
        deleteItemsMutation.mutate(Array.from(selectedIds), {
            onSuccess: () => {
                setSelectedIds(new Set())
                setDeleteConfirmOpen(false)
            },
        })
    }, [selectedIds, deleteItemsMutation])

    const updatedSecondsAgo = dataUpdatedAt != null ? Math.max(0, Math.floor((Date.now() - dataUpdatedAt) / 1000)) : 0

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
        <TableHead>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="-ml-2 h-8 font-medium text-muted-foreground hover:text-foreground"
                onClick={() => toggleSort(field)}
            >
                {label}
                {sortBy === field ? (
                    sortOrder === 'asc' ? (
                        <ChevronUp className="ml-1 size-4" aria-hidden />
                    ) : (
                        <ChevronDown className="ml-1 size-4" aria-hidden />
                    )
                ) : null}
            </Button>
        </TableHead>
    )

    return (
        <div className="space-y-6">
            <Breadcrumbs
                items={[
                    { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('common.breadcrumbs.items') },
                ]}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('items.title')}</h1>
                    <p className="text-muted-foreground mt-1">{t('items.subtitle')}</p>
                </div>
                <CreateItemModal trigger={<Button>{t('common.createItem')}</Button>} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('items.title')}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {isLoading ? t('items.loading') : t('items.countLabel', { count: filteredItems.length })}
                        {!isLoading && (
                            <span className="text-muted-foreground text-xs">
                                {t('items.updatedAgo', { seconds: updatedSecondsAgo })}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isLoading && (items?.length ?? 0) > 0 && (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <div className="relative flex-1">
                                    <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                                    <Input
                                        placeholder={t('items.searchPlaceholder')}
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setPage(0)
                                        }}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {(['all', 'active', 'draft', 'archived'] as const).map((status) => (
                                        <Button
                                            key={status}
                                            variant={statusFilter === status ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => {
                                                setStatusFilter(status)
                                                setPage(0)
                                            }}
                                        >
                                            {status === 'all' ? t('items.filterAll') : t(`items.status.${status}`)}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" onClick={handleExportCsv} className="gap-1">
                                    <Download className="size-4" aria-hidden />
                                    {t('items.export')}
                                </Button>
                                {someSelected && (
                                    <ConfirmationWindowTrigger
                                        open={deleteConfirmOpen}
                                        onOpenChange={setDeleteConfirmOpen}
                                        btnTrigger={t('items.deleteSelected')}
                                        question={t('items.deleteSelected')}
                                        description={t('items.deleteSelectedConfirm')}
                                        cancelBtn={t('common.close')}
                                        okBtn={t('items.deleteSelected')}
                                        handleConfirm={handleDeleteSelected}
                                        isPending={deleteItemsMutation.isPending}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {isLoading && <TableSkeleton rows={8} cols={5} />}
                    {!isLoading && (!items || items.length === 0) && (
                        <EmptyState icon={<Inbox />} title={t('items.empty')} />
                    )}
                    {!isLoading && filteredItems.length === 0 && items && items.length > 0 && (
                        <EmptyState icon={<Search />} title={t('items.noMatches')} />
                    )}
                    {!isLoading && paginatedItems.length > 0 && (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10">
                                            <input
                                                type="checkbox"
                                                checked={allOnPageSelected}
                                                onChange={toggleSelectAll}
                                                aria-label={t('items.selectAll')}
                                                className="size-4 rounded border-input"
                                            />
                                        </TableHead>
                                        <TableHead className="w-16">{t('items.table.id')}</TableHead>
                                        <SortHeader field="title" label={t('items.table.title')} />
                                        <SortHeader field="status" label={t('items.table.status')} />
                                        <SortHeader field="createdAt" label={t('items.table.createdAt')} />
                                        <TableHead className="w-10" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(item.id)}
                                                    onChange={() => toggleSelect(item.id)}
                                                    aria-label={item.title}
                                                    className="size-4 rounded border-input"
                                                />
                                            </TableCell>
                                            <TableCell className="text-muted-foreground font-mono text-xs">
                                                {item.id.slice(0, 8)}…
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Link
                                                    to={`/items/${item.id}`}
                                                    className="hover:text-primary hover:underline"
                                                >
                                                    {item.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        item.status === 'active'
                                                            ? 'default'
                                                            : item.status === 'draft'
                                                              ? 'secondary'
                                                              : 'outline'
                                                    }
                                                >
                                                    {t(`items.status.${item.status}`)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(item.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    aria-label={t('common.editItem')}
                                                    onClick={() => setEditingItem(item)}
                                                >
                                                    <Pencil className="size-4" aria-hidden />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    labelPrevious={t('items.pagination.previous')}
                                    labelNext={t('items.pagination.next')}
                                    labelPageOf={t('items.pagination.pageOf', {
                                        current: page + 1,
                                        total: totalPages,
                                    })}
                                />
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    open={!!editingItem}
                    onOpenChange={(open) => !open && setEditingItem(null)}
                />
            )}
        </div>
    )
}
