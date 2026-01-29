import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SelectTitle } from '@shared/ui/selects'
import { ModalWindowTrigger } from '@shared/ui/modal'
import { LabeledColumn, TextareaControlled } from '@shared/ui/form-fields'
import type { CatalogItem, UuId } from '@shared/types'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ClosedPositionFormValueData } from './model/types'
import { closePositionSchema } from './model/schema'
import { useClosePositionMutation } from './hooks/use-close-position-mutation'

const verdicts: CatalogItem[] = [
    { uuid: '1', title: 'Approved' },
    { uuid: '2', title: 'Rejected' },
]

const reasonsToReject: CatalogItem[] = [
    { uuid: '1', title: "Didn't like CV" },
    { uuid: '2', title: 'Rate' },
    { uuid: '3', title: 'Found another candidate' },
    { uuid: '4', title: 'Poor English' },
    { uuid: '5', title: 'Low tech level' },
    { uuid: '6', title: 'Cultural mismatch' },
    { uuid: '7', title: 'Location check' },
    { uuid: '8', title: 'Repeat' },
    { uuid: '9', title: 'Other' },
]

const reasonsToApprove: CatalogItem[] = [
    { uuid: '1', title: '-' },
    { uuid: '2', title: 'Other' },
]

type Props = {
    request_uuid: UuId
    request_positions_id: UuId
}

export function ClosePositionButton({ request_uuid, request_positions_id }: Props) {
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useClosePositionMutation(request_uuid, request_positions_id)
    const formId: string = 'close-position-form'
    const {
        reset,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ClosedPositionFormValueData>({
        resolver: yupResolver<ClosedPositionFormValueData>(closePositionSchema),
    })

    const onSubmit = (data: ClosedPositionFormValueData) => {
        const { verdict, comment } = data
        const dataDTO = { verdict, comment }
        mutate(dataDTO, {
            onSuccess: () => {
                setOpen(false)
                reset()
            },
        })
    }

    const verdict = watch('verdict')
    const reason = watch('reason')

    useEffect(() => {
        if (reason && reason !== 'Other') {
            setValue('comment', reason)
        } else {
            setValue('comment', '')
        }
    }, [reason])

    useEffect(() => {
        if (verdict === 'Approved') {
            setValue('reason', '-')
        } else if (verdict === 'Rejected') {
            setValue('reason', '')
        }
    }, [verdict])

    return (
        <ModalWindowTrigger
            title="Are you absolutely sure?"
            btnTriggerContent="Close Position"
            description="This action cannot be undone. This will permanently close this position."
            onOpenChange={setOpen}
            open={open}
            formId={formId}
            isPending={isPending}
        >
            <form id={formId} onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <LabeledColumn label="Verdict" id="verdict">
                    <Controller
                        name="verdict"
                        control={control}
                        render={({ field }) => (
                            <SelectTitle
                                value={field.value}
                                onChange={field.onChange}
                                list={verdicts}
                                label="Verdict"
                                placeholder="Select position closing verdict"
                                id="verdict"
                            />
                        )}
                    />
                    <p className="field-error">{errors.verdict?.message}</p>
                </LabeledColumn>
                <LabeledColumn label="Reason" id="reason">
                    <Controller
                        control={control}
                        name="reason"
                        render={({ field }) => (
                            <SelectTitle
                                value={field.value}
                                onChange={field.onChange}
                                list={verdict === 'Approved' ? reasonsToApprove : reasonsToReject}
                                label="Reason"
                                placeholder="Select the reason"
                                id="reason"
                                disabled={!verdict}
                            />
                        )}
                    />
                    <p className="field-error">{errors.reason?.message}</p>
                </LabeledColumn>
                <LabeledColumn label="Comment" id="comment" columnClass={reason === 'Other' ? '' : 'hidden'}>
                    <TextareaControlled control={control} name="comment" placeholder="Enter the reason of closing" />
                </LabeledColumn>
            </form>
        </ModalWindowTrigger>
    )
}
