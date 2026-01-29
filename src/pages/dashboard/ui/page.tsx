import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { TableSkeleton } from '@shared/ui/table-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { CardSkeleton } from '@shared/ui/card-skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { useItemsQuery } from '@entities/item'

const STAT_CARDS = [
    { key: 'totalItems' as const, color: 'text-primary' },
    { key: 'activeItems' as const, color: 'text-green-600 dark:text-green-400' },
    { key: 'draftItems' as const, color: 'text-amber-600 dark:text-amber-400' },
] as const

export function DashboardPage() {
    const { t } = useTranslation()
    const { data: items, isLoading } = useItemsQuery()

    const activeCount = items?.filter((i) => i.status === 'active').length ?? 0
    const draftCount = items?.filter((i) => i.status === 'draft').length ?? 0
    const recentItems = (items ?? []).slice(0, 5)

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="space-y-8">
            <Breadcrumbs
                items={[{ label: t('common:common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] }]}
            />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboard:dashboard.welcome')}</h1>
                <p className="text-muted-foreground mt-1">{t('dashboard:dashboard.subtitle')}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {isLoading ? (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                ) : (
                    STAT_CARDS.map(({ key, color }) => (
                        <Card key={key}>
                            <CardHeader className="pb-2">
                                <CardDescription>{t(`dashboard:dashboard.${key}`)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <span className={color}>
                                    {key === 'totalItems' && (items?.length ?? 0)}
                                    {key === 'activeItems' && activeCount}
                                    {key === 'draftItems' && draftCount}
                                </span>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{t('dashboard:dashboard.recentItems')}</CardTitle>
                            <CardDescription>
                                {isLoading ? t('items:items.loading') : `${recentItems.length} items`}
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link to={RoutePath[AppRoutes.ITEMS]} className="gap-1">
                                {t('dashboard:dashboard.viewAll')}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <TableSkeleton rows={5} cols={3} />
                        ) : recentItems.length === 0 ? (
                            <p className="text-muted-foreground text-sm">{t('items:items.empty')}</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('items:items.table.title')}</TableHead>
                                        <TableHead>{t('items:items.table.status')}</TableHead>
                                        <TableHead>{t('items:items.table.createdAt')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{t(`items:items.status.${item.status}`)}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(item.createdAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                        <CardDescription>{t('dashboard:dashboard.chartPlaceholder')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/50 flex h-[280px] items-center justify-center rounded-lg border border-dashed">
                            <p className="text-muted-foreground text-sm">{t('dashboard:dashboard.chartPlaceholder')}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
