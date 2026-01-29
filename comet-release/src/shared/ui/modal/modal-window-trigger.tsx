import type { VariantProps } from 'class-variance-authority'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/ui/dialog'
import type { buttonVariants } from '@shared/ui/button'
import { Button } from '@shared/ui/button'
import type { WithChildren, WithClassName } from '@shared/types'
import { cn } from '@shared/lib/ui'

type Props = {
    title: string
    btnTriggerContent: string
    btnTriggerVariant?: VariantProps<typeof buttonVariants>
    description: string
    btnOkText?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    isPending?: boolean
    interactOutside?: boolean
    formId?: string
    scrollable?: true
    autofocus?: boolean
}
export function ModalWindowTrigger({
    btnTriggerContent,
    btnTriggerVariant,
    description,
    title,
    children,
    btnOkText = 'Save',
    open,
    onOpenChange,
    isPending,
    interactOutside = true,
    formId,
    scrollable,
    autofocus = true,
}: Props & WithChildren & WithClassName) {
    const handleClose = () => {
        onOpenChange(false)
    }

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogTrigger asChild>
                <Button {...btnTriggerVariant}>{btnTriggerContent}</Button>
            </DialogTrigger>
            <DialogContent
                className={cn('sm:max-w-[600px] max-h-modal h-fit', {
                    'h-full': scrollable,
                })}
                onInteractOutside={interactOutside ? undefined : (e) => e.preventDefault()}
                onOpenAutoFocus={autofocus ? undefined : (e) => e.preventDefault()}
            >
                <DialogHeader className={cn(scrollable && 'w-full fixed p-6')}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className={cn(scrollable && 'mt-14 px-1 overflow-y-auto no-scrollbar')}>
                    <div>{children}</div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" form={formId} disabled={isPending}>
                            {btnOkText}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
