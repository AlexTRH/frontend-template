import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Inbox } from 'lucide-react'
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
    const archivedCount = items?.filter((i) => i.status === 'archived').length ?? 0
    const recentItems = (items ?? []).slice(0, 5)

    const chartData = [
        { name: t('items.status.active'), value: activeCount, fill: 'oklch(0.55 0.15 145)' },
        { name: t('items.status.draft'), value: draftCount, fill: 'oklch(0.72 0.19 75)' },
        { name: t('items.status.archived'), value: archivedCount, fill: 'oklch(0.55 0.02 250)' },
    ].filter((d) => d.value > 0)

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="space-y-8">
            <Breadcrumbs items={[{ label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] }]} />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.welcome')}</h1>
                <p className="text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
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
                                <CardDescription>{t(`dashboard.${key}`)}</CardDescription>
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
                            <CardTitle>{t('dashboard.recentItems')}</CardTitle>
                            <CardDescription>
                                {isLoading ? t('items.loading') : t('items.countLabel', { count: recentItems.length })}
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link to={RoutePath[AppRoutes.ITEMS]} className="gap-1">
                                {t('dashboard.viewAll')}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <TableSkeleton rows={5} cols={3} />
                        ) : recentItems.length === 0 ? (
                            <div className="text-muted-foreground flex flex-col items-center gap-2 py-8">
                                <Inbox className="size-9 shrink-0 opacity-50" aria-hidden />
                                <p className="text-center text-sm">{t('items.empty')}</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('items.table.title')}</TableHead>
                                        <TableHead>{t('items.table.status')}</TableHead>
                                        <TableHead>{t('items.table.createdAt')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{t(`items.status.${item.status}`)}</TableCell>
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
                        <CardTitle>{t('dashboard.analytics')}</CardTitle>
                        <CardDescription>{t('dashboard.chartPlaceholder')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[280px] w-full">
                            {isLoading ? (
                                <div className="bg-muted/50 flex h-full items-center justify-center rounded-lg border border-dashed">
                                    <p className="text-muted-foreground text-sm">{t('items.loading')}</p>
                                </div>
                            ) : chartData.length === 0 ? (
                                <div className="bg-muted/50 flex h-full items-center justify-center rounded-lg border border-dashed">
                                    <p className="text-muted-foreground text-sm">{t('items.empty')}</p>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="55%"
                                            outerRadius="80%"
                                            paddingAngle={2}
                                            stroke="var(--color-card)"
                                            strokeWidth={2}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 'var(--radius)',
                                                border: '1px solid var(--border)',
                                                background: 'var(--color-card)',
                                            }}
                                        />
                                        <Legend
                                            layout="vertical"
                                            align="right"
                                            verticalAlign="middle"
                                            wrapperStyle={{ fontSize: 12 }}
                                            formatter={(value: string) => value}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
