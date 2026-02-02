import type { PropsWithChildren, ReactNode } from 'react'
import { Button } from '@shared/ui/button'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@shared/ui/alert-dialog'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    btnTrigger?: string
    question?: ReactNode
    description?: ReactNode
    cancelBtn?: string
    okBtn?: string
    handleConfirm: () => void
    isPending: boolean
}

export function ConfirmationWindowTrigger({
    open,
    onOpenChange,
    handleConfirm,
    okBtn = 'Confirm',
    cancelBtn = 'Cancel',
    btnTrigger,
    question = 'Are you absolutely sure?',
    description,
    children,
    isPending,
}: Props & PropsWithChildren) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild hidden={!btnTrigger}>
                <Button variant="default">{btnTrigger}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {question && <AlertDialogTitle>{question}</AlertDialogTitle>}
                    {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
                </AlertDialogHeader>
                {children}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>{cancelBtn}</AlertDialogCancel>
                    <Button onClick={handleConfirm} disabled={isPending}>
                        {okBtn}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
