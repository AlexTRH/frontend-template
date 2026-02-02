import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { Settings as SettingsIcon, Upload } from 'lucide-react'
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
import { apiClient } from '@shared/api'

export function SettingsPage() {
    const { t } = useTranslation()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [emailNotifications, setEmailNotifications] = useLocalStorage('settings-email-notifications', true)

    const handleConfirmDemo = () => {
        setIsPending(true)
        setTimeout(() => {
            setIsPending(false)
            setConfirmOpen(false)
        }, 500)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setUploadFile(file ?? null)
    }

    const handleUpload = async () => {
        if (!uploadFile) return
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', uploadFile)
            await apiClient.post('/upload', formData)
            toast.success(t('settings.settings.uploadSuccess'))
            setUploadFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch {
            toast.error('Upload failed')
        } finally {
            setUploading(false)
        }
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
                    <CardTitle>{t('settings.settings.examples.confirmationTitle')}</CardTitle>
                    <CardDescription>{t('settings.settings.examples.confirmationDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <ConfirmationWindowTrigger
                        open={confirmOpen}
                        onOpenChange={setConfirmOpen}
                        btnTrigger={t('settings.settings.examples.openConfirmation')}
                        question={t('settings.settings.examples.confirmQuestion')}
                        description={t('settings.settings.examples.confirmDescription')}
                        cancelBtn={t('settings.settings.examples.cancel')}
                        okBtn={t('settings.settings.examples.confirm')}
                        handleConfirm={handleConfirmDemo}
                        isPending={isPending}
                    />
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">{t('settings.settings.examples.openSheet')}</Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="gap-0">
                            <SheetHeader>
                                <SheetTitle>{t('settings.settings.examples.sheetTitle')}</SheetTitle>
                            </SheetHeader>
                            <div className="flex-1 overflow-auto px-6 py-5">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {t('settings.settings.examples.sheetDescription')}
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">{t('settings.settings.examples.tooltipTrigger')}</Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('settings.settings.examples.tooltipContent')}</TooltipContent>
                    </Tooltip>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t('settings.settings.fileUpload')}</CardTitle>
                    <CardDescription>{t('settings.settings.fileUploadDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="text-muted-foreground file:mr-2 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground file:text-sm"
                        aria-label={t('settings.settings.upload')}
                    />
                    {uploadFile && (
                        <p className="text-muted-foreground text-sm">
                            {t('settings.settings.fileSelected', {
                                name: uploadFile.name,
                                size: uploadFile.size,
                            })}
                        </p>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!uploadFile || uploading}
                        onClick={handleUpload}
                        className="gap-1"
                    >
                        <Upload className="size-4" aria-hidden />
                        {uploading ? '...' : t('settings.settings.upload')}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
