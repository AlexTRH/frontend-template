import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ModalWindowTrigger } from '@shared/ui/modal'
import { LabeledColumn, TextareaControlled } from '@shared/ui/form-fields'
import type { UuId } from '@shared/types'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ClosedRequestData } from './model'
import { closeRequestSchema } from './model'
import { useCloseRequestMutation } from './hooks'

type Props = {
    request_uuid: UuId
}

export function CloseRequestBtn({ request_uuid }: Props) {
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useCloseRequestMutation(request_uuid)
    const formId: string = 'close-request-form'
    const { reset, control, handleSubmit } = useForm<ClosedRequestData>({
        resolver: yupResolver<ClosedRequestData>(closeRequestSchema),
    })

    const onSubmit = (data: ClosedRequestData) => {
        mutate(data, {
            onSuccess: () => {
                setOpen(false)
                reset()
            },
        })
    }
    return (
        <ModalWindowTrigger
            title="Are you absolutely sure?"
            btnTriggerContent="Close Request"
            description="This action cannot be undone. This will permanently close this request."
            onOpenChange={setOpen}
            open={open}
            formId={formId}
            isPending={isPending}
        >
            <form id={formId} onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <LabeledColumn label="Skip reason" id="skip_reason">
                    <TextareaControlled
                        control={control}
                        name="skip_reason"
                        placeholder="Enter the reason of closing"
                        disabled={isPending}
                    />
                </LabeledColumn>
            </form>
        </ModalWindowTrigger>
    )
}
