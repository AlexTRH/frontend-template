import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { Input } from '@shared/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog'
import { Button } from '@shared/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ItemStatus } from '@entities/item'

import { getCreateItemSchema, type CreateItemFormValue } from './model'
import { useCreateItemMutation } from './hooks'

const STATUS_OPTIONS: ItemStatus[] = ['active', 'draft', 'archived']

type CreateItemModalProps = {
    trigger: ReactNode
}

export function CreateItemModal({ trigger }: CreateItemModalProps) {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const mutation = useCreateItemMutation()
    const schema = useMemo(() => getCreateItemSchema((key, opts) => t(key, opts)), [t])

    const form = useForm<CreateItemFormValue>({
        resolver: zodResolver(schema),
        defaultValues: { title: '', status: 'active' },
    })

    const handleSubmit = form.handleSubmit((values) => {
        mutation.mutate(values, {
            onSuccess: () => {
                form.reset()
                setOpen(false)
            },
        })
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('common:common.createItem')}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('common:common.itemTitle')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Item title" {...field} />
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
                                    <FormLabel>{t('items:items.table.status')}</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('items:items.status.active')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {t(`items:items.status.${status}`)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Creating...' : 'Create'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
