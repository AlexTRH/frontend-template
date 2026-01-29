import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { TableSkeleton } from '@shared/ui/table-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { Input } from '@shared/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { CreateItemModal } from '@features/create-item'
import { useItemsQuery } from '@entities/item'
import type { ItemStatus } from '@entities/item'

const PAGE_SIZE = 10

export function ItemsPage() {
    const { t } = useTranslation()
    const { data: items, isLoading } = useItemsQuery()
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ItemStatus | 'all'>('all')
    const [page, setPage] = useState(0)

    const filteredItems = useMemo(() => {
        if (!items) return []
        return items.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [items, searchQuery, statusFilter])

    const paginatedItems = useMemo(() => {
        const start = page * PAGE_SIZE
        return filteredItems.slice(start, start + PAGE_SIZE)
    }, [filteredItems, page])

    const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE) || 1

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs
                items={[
                    { label: t('common:common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('common:common.breadcrumbs.items') },
                ]}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('items:items.title')}</h1>
                    <p className="text-muted-foreground mt-1">{t('items:items.subtitle')}</p>
                </div>
                <CreateItemModal trigger={<Button>{t('common:common.createItem')}</Button>} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('items:items.title')}</CardTitle>
                    <CardDescription>
                        {isLoading ? t('items:items.loading') : `${filteredItems.length} items`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isLoading && (items?.length ?? 0) > 0 && (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                                <Input
                                    placeholder={t('items:items.searchPlaceholder')}
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
                                        {status === 'all'
                                            ? t('items:items.filterAll')
                                            : t(`items:items.status.${status}`)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                    {isLoading && <TableSkeleton rows={8} cols={4} />}
                    {!isLoading && (!items || items.length === 0) && (
                        <p className="text-muted-foreground py-8 text-center text-sm">{t('items:items.empty')}</p>
                    )}
                    {!isLoading && filteredItems.length === 0 && items && items.length > 0 && (
                        <p className="text-muted-foreground py-8 text-center text-sm">{t('items:items.noMatches')}</p>
                    )}
                    {!isLoading && paginatedItems.length > 0 && (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('items:items.table.id')}</TableHead>
                                        <TableHead>{t('items:items.table.title')}</TableHead>
                                        <TableHead>{t('items:items.table.status')}</TableHead>
                                        <TableHead>{t('items:items.table.createdAt')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-muted-foreground font-mono text-xs">
                                                {item.id.slice(0, 8)}…
                                            </TableCell>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{t(`items:items.status.${item.status}`)}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(item.createdAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between border-t pt-4">
                                    <p className="text-muted-foreground text-sm">
                                        {t('items:items.pagination.pageOf', {
                                            current: page + 1,
                                            total: totalPages,
                                        })}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page === 0}
                                            onClick={() => setPage((p) => p - 1)}
                                        >
                                            {t('items:items.pagination.previous')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page >= totalPages - 1}
                                            onClick={() => setPage((p) => p + 1)}
                                        >
                                            {t('items:items.pagination.next')}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
