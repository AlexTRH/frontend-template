import { toast } from 'sonner'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useCallback } from 'react'
import { ArrowLeft, Copy, FileQuestion, Pencil } from 'lucide-react'
import { EmptyState } from '@shared/ui/empty-state'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { Badge } from '@shared/ui/badge'
import { AppRoutes, RoutePath } from '@shared/config/router'
import { EditItemModal } from '@features/edit-item'
import { useItemsQuery } from '@entities/item'

/**
 * Страница детали айтема — эталон динамического роута: useParams('id'), данные из списка или отдельного запроса.
 */
export function ItemDetailPage() {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [editOpen, setEditOpen] = useState(false)
    const { data: items, isLoading } = useItemsQuery()
    const item = items?.find((i) => i.id === id)

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

    const copyId = useCallback(async () => {
        if (!item) return
        try {
            await navigator.clipboard.writeText(item.id)
            toast.success(t('items.copied'))
        } catch {
            toast.error('Failed to copy')
        }
    }, [item, t])

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Breadcrumbs
                    items={[
                        { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                        { label: t('common.breadcrumbs.items'), to: RoutePath[AppRoutes.ITEMS] },
                        { label: t('items.loading') },
                    ]}
                />
                <Card>
                    <CardContent className="py-10">
                        <p className="text-muted-foreground text-center text-sm">{t('items.loading')}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!item) {
        return (
            <div className="space-y-6">
                <Breadcrumbs
                    items={[
                        { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                        { label: t('common.breadcrumbs.items'), to: RoutePath[AppRoutes.ITEMS] },
                        { label: t('items.detail.notFound') },
                    ]}
                />
                <EmptyState
                    icon={<FileQuestion />}
                    title={t('items.detail.notFound')}
                    action={
                        <Button asChild variant="outline" size="sm">
                            <Link to={RoutePath[AppRoutes.ITEMS]} className="gap-2">
                                <ArrowLeft className="size-4" aria-hidden />
                                {t('items.detail.back')}
                            </Link>
                        </Button>
                    }
                />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs
                items={[
                    { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('common.breadcrumbs.items'), to: RoutePath[AppRoutes.ITEMS] },
                    { label: item.title },
                ]}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
                    <p className="text-muted-foreground mt-1">{t('items.detail.title')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setEditOpen(true)}
                        aria-label={t('common.editItem')}
                    >
                        <Pencil className="size-4" aria-hidden />
                        {t('common.editItem')}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={copyId}
                        aria-label={t('items.copyId')}
                    >
                        <Copy className="size-4" aria-hidden />
                        {t('items.copyId')}
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2 w-fit">
                        <Link to={RoutePath[AppRoutes.ITEMS]}>
                            <ArrowLeft className="size-4" aria-hidden />
                            {t('items.detail.back')}
                        </Link>
                    </Button>
                </div>
            </div>
            {item && <EditItemModal item={item} open={editOpen} onOpenChange={setEditOpen} />}
            <Card>
                <CardHeader>
                    <CardTitle>{t('items.table.title')}</CardTitle>
                    <CardDescription className="sr-only">{item.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-muted-foreground text-sm">{t('items.table.status')}</p>
                        <Badge
                            variant={
                                item.status === 'active' ? 'default' : item.status === 'draft' ? 'secondary' : 'outline'
                            }
                        >
                            {t(`items.status.${item.status}`)}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">{t('items.table.createdAt')}</p>
                        <p className="text-sm">{formatDate(item.createdAt)}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
