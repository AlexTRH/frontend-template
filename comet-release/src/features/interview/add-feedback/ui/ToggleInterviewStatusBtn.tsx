import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { FormEventHandler, ReactNode } from 'react'
import { Textarea } from '@shared/ui/textarea'
import { Label } from '@shared/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/ui/dialog'
import { Button } from '@shared/ui/button'

import type { FeedbackFormValue } from '../model/types'

type Props = {
    title: string
    btnTrigger: ReactNode
    btnOkText?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    isPending?: boolean
    formId?: string
    register: UseFormRegister<FeedbackFormValue>
    onSubmit: FormEventHandler
    errors: FieldErrors<FeedbackFormValue>
}

export function ToggleInterviewStatusBtn({
    btnTrigger,
    title,
    btnOkText = 'Save',
    open,
    onOpenChange,
    isPending,
    formId,
    register,
    onSubmit,
    errors,
}: Props) {
    const description = 'Please fill out the feedback form for the interview stage'
    const handleClose = () => {
        onOpenChange(false)
    }
    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogTrigger asChild>{btnTrigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form id={formId} onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="feedback_text">Feedback</Label>
                        <Textarea
                            id="feedback_text"
                            {...register('feedback_text', { setValueAs: (value: string) => value.trim() })}
                            placeholder="Feedback from the customer..."
                            className="h-[150px]"
                        />
                        <p className="field-error">{errors.feedback_text?.message}</p>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" form={formId} disabled={isPending}>
                        {btnOkText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
