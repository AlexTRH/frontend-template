import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useMemo, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { Input } from '@shared/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/dialog'
import { Button } from '@shared/ui/button'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@shared/ui/alert-dialog'
import { setFormErrorsFromApi } from '@shared/lib/set-form-errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCreateItemSchema, type CreateItemFormValue } from '@features/create-item/model'
import { useUpdateItemMutation } from '@entities/item'
import type { Item, ItemStatus } from '@entities/item'

const STATUS_OPTIONS: ItemStatus[] = ['active', 'draft', 'archived']

type EditItemModalProps = {
    item: Item
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditItemModal({ item, open, onOpenChange }: EditItemModalProps) {
    const { t } = useTranslation()
    const [discardOpen, setDiscardOpen] = useState(false)
    const mutation = useUpdateItemMutation()
    const schema = useMemo(() => getCreateItemSchema((key, opts) => t(key, opts)), [t])

    const form = useForm<CreateItemFormValue>({
        resolver: zodResolver(schema),
        defaultValues: { title: item.title, status: item.status },
    })

    useEffect(() => {
        if (open) {
            form.reset({ title: item.title, status: item.status })
            setDiscardOpen(false)
        }
    }, [open, item.id, item.title, item.status, form])

    const handleOpenChange = (next: boolean) => {
        if (!next && form.formState.isDirty) {
            setDiscardOpen(true)
            return
        }
        onOpenChange(next)
    }

    const handleDiscard = () => {
        form.reset({ title: item.title, status: item.status })
        setDiscardOpen(false)
        onOpenChange(false)
    }

    const handleSubmit = form.handleSubmit((values) => {
        mutation.mutate(
            { id: item.id, payload: values },
            {
                onSuccess: () => {
                    onOpenChange(false)
                },
                onError: (error) => {
                    setFormErrorsFromApi(error, form.setError)
                },
            }
        )
    })

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('common.editItem')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('common.itemTitle')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('common.itemTitle')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('items.table.status')}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('items.status.active')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {STATUS_OPTIONS.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {t(`items.status.${status}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? t('common.saving') : t('common.edit')}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('common.discardChanges')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('common.discardChanges')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.close')}</AlertDialogCancel>
                        <Button variant="destructive" onClick={handleDiscard}>
                            {t('common.discard')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
