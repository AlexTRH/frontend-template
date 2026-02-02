import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Inbox } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@shared/ui/sheet'
import { Pagination } from '@shared/ui/pagination'
import { Input } from '@shared/ui/input'
import { EmptyState } from '@shared/ui/empty-state'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog'
import { ConfirmationWindowTrigger } from '@shared/ui/confirmation-window-trigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { Badge } from '@shared/ui/badge'
import { AppRoutes, RoutePath } from '@shared/config/router'

/**
 * Страница-справочник по UI-компонентам. Показывается только в dev (ссылка в сайдбаре).
 * У каждого компонента — краткое описание и живой пример.
 */
export function ComponentsPage() {
    const { t } = useTranslation()
    const [paginationPage, setPaginationPage] = useState(0)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const totalPages = 3

    return (
        <div className="space-y-8">
            <Breadcrumbs
                items={[
                    { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('common.nav.components') },
                ]}
            />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('common.nav.components')}</h1>
                <p className="text-muted-foreground mt-1">{t('components.subtitle')}</p>
            </div>

            {/* Button + Badge — примеры вариантов */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Button</CardTitle>
                    <CardDescription>{t('components.usage.button')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Button size="sm">{t('components.example.buttonDefault')}</Button>
                    <Button variant="outline" size="sm">
                        {t('components.example.buttonOutline')}
                    </Button>
                    <Button variant="ghost" size="sm">
                        {t('components.example.buttonGhost')}
                    </Button>
                    <Button variant="destructive" size="sm">
                        {t('components.example.buttonDestructive')}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Badge</CardTitle>
                    <CardDescription>{t('components.usage.badge')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="default">{t('components.example.badgeActive')}</Badge>
                    <Badge variant="secondary">{t('components.example.badgeDraft')}</Badge>
                    <Badge variant="outline">{t('components.example.badgeArchived')}</Badge>
                </CardContent>
            </Card>

            {/* Card — вложенная карточка как пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Card</CardTitle>
                    <CardDescription>{t('components.usage.card')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Card className="border-muted-foreground/20 border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{t('components.example.cardNestedTitle')}</CardTitle>
                            <CardDescription className="text-xs">
                                {t('components.example.cardNestedDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm">
                            {t('components.example.cardNestedContent')}
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            {/* Table — мини-таблица */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Table</CardTitle>
                    <CardDescription>{t('components.usage.table')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-mono text-xs">1</TableCell>
                                <TableCell>{t('components.example.badgeActive')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono text-xs">2</TableCell>
                                <TableCell>{t('components.example.badgeDraft')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* EmptyState */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">EmptyState</CardTitle>
                    <CardDescription>{t('components.usage.emptyState')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <EmptyState icon={<Inbox />} title={t('components.example.emptyStateTitle')} className="py-6" />
                </CardContent>
            </Card>

            {/* Input */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Input</CardTitle>
                    <CardDescription>{t('components.usage.inputSelect')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input placeholder={t('components.example.inputPlaceholder')} className="max-w-xs" />
                </CardContent>
            </Card>

            {/* Pagination */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Pagination</CardTitle>
                    <CardDescription>{t('components.usage.pagination')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Pagination
                        currentPage={paginationPage}
                        totalPages={totalPages}
                        onPageChange={setPaginationPage}
                        labelPrevious={t('items.pagination.previous')}
                        labelNext={t('items.pagination.next')}
                        labelPageOf={t('items.pagination.pageOf', {
                            current: paginationPage + 1,
                            total: totalPages,
                        })}
                    />
                </CardContent>
            </Card>

            {/* Breadcrumbs */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Breadcrumbs</CardTitle>
                    <CardDescription>{t('components.usage.breadcrumbs')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Breadcrumbs
                        items={[
                            { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                            { label: t('common.nav.components') },
                        ]}
                    />
                </CardContent>
            </Card>

            {/* Dialog — живой пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('components.title.dialog')}</CardTitle>
                    <CardDescription>{t('components.usage.dialog')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                {t('components.example.dialogExampleTitle')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t('components.example.dialogExampleTitle')}</DialogTitle>
                                <DialogDescription>{t('components.example.dialogExampleContent')}</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            {/* Sheet — живой пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('components.title.sheet')}</CardTitle>
                    <CardDescription>{t('components.usage.sheet')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                                {t('components.example.sheetExampleTitle')}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="gap-0">
                            <SheetHeader>
                                <SheetTitle>{t('components.example.sheetExampleTitle')}</SheetTitle>
                            </SheetHeader>
                            <div className="flex-1 overflow-auto px-6 py-5">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {t('components.example.sheetExampleContent')}
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>

            {/* AlertDialog — живой пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('components.title.alertDialog')}</CardTitle>
                    <CardDescription>{t('components.usage.alertDialog')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ConfirmationWindowTrigger
                        open={alertOpen}
                        onOpenChange={setAlertOpen}
                        btnTrigger={t('components.example.openAlert')}
                        question={t('components.example.alertExampleQuestion')}
                        description={t('components.example.alertExampleDescription')}
                        cancelBtn={t('components.example.alertCancel')}
                        okBtn={t('components.example.alertConfirm')}
                        handleConfirm={() => setAlertOpen(false)}
                        isPending={false}
                    />
                </CardContent>
            </Card>

            {/* Form — только описание + ссылка на пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('components.title.form')}</CardTitle>
                    <CardDescription>{t('components.usage.form')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">{t('components.example.formSeeItems')}</p>
                </CardContent>
            </Card>

            {/* Toaster — живой пример */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('components.title.toaster')}</CardTitle>
                    <CardDescription>{t('components.usage.toaster')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.success(t('components.example.toastMessage'))}
                    >
                        {t('components.example.showToast')}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
