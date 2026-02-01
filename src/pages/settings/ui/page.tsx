import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs'
import { Switch } from '@shared/ui/switch'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@shared/ui/sheet'
import { Separator } from '@shared/ui/separator'
import { Label } from '@shared/ui/label'
import { ConfirmationWindowTrigger } from '@shared/ui/confirmation-window-trigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { useLocalStorage } from '@shared/hooks'
import { AppRoutes, RoutePath } from '@shared/config/router'

export function SettingsPage() {
    const { t } = useTranslation()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [emailNotifications, setEmailNotifications] = useLocalStorage('settings-email-notifications', true)

    const handleConfirmDemo = () => {
        setIsPending(true)
        setTimeout(() => {
            setIsPending(false)
            setConfirmOpen(false)
        }, 500)
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs
                items={[
                    { label: t('common.breadcrumbs.dashboard'), to: RoutePath[AppRoutes.DASHBOARD] },
                    { label: t('settings.settings.title') },
                ]}
            />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('settings.settings.title')}</h1>
                <p className="text-muted-foreground mt-1">{t('settings.settings.subtitle')}</p>
            </div>
            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">{t('settings.settings.tabs.general')}</TabsTrigger>
                    <TabsTrigger value="notifications">{t('settings.settings.tabs.notifications')}</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <SettingsIcon className="size-5" aria-hidden />
                                {t('settings.settings.general')}
                            </CardTitle>
                            <CardDescription>{t('settings.settings.generalDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{t('settings.settings.comingSoon')}</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('settings.settings.notificationsEmail')}</CardTitle>
                            <CardDescription>{t('settings.settings.notificationsEmailDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                                <span>{t('settings.settings.notificationsEmail')}</span>
                                <span className="text-muted-foreground text-sm font-normal">
                                    {t('settings.settings.notificationsEmailDescription')}
                                </span>
                            </Label>
                            <Switch
                                id="email-notifications"
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle>Example: confirmation modal</CardTitle>
                    <CardDescription>
                        ConfirmationWindowTrigger (AlertDialog) — for confirm/cancel actions. ModalWindowTrigger — for
                        forms in a modal (see Create Item on Items page).
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <ConfirmationWindowTrigger
                        open={confirmOpen}
                        onOpenChange={setConfirmOpen}
                        btnTrigger="Open confirmation"
                        question="Are you sure?"
                        description="This is a demo. Nothing will be deleted."
                        cancelBtn="Cancel"
                        okBtn="Confirm"
                        handleConfirm={handleConfirmDemo}
                        isPending={isPending}
                    />
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">Open side panel</Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Example: Sheet</SheetTitle>
                            </SheetHeader>
                            <p className="text-muted-foreground text-sm">
                                Sheet slides in from the side. Use for filters, details, or secondary actions.
                            </p>
                        </SheetContent>
                    </Sheet>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover for tooltip</Button>
                        </TooltipTrigger>
                        <TooltipContent>This is a tooltip. Use for short hints.</TooltipContent>
                    </Tooltip>
                </CardContent>
            </Card>
        </div>
    )
}
