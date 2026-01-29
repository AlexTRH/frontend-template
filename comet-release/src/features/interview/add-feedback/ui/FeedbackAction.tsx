import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@shared/ui/button'
import type { UuId } from '@shared/types'
import { yupResolver } from '@hookform/resolvers/yup'

import { ToggleInterviewStatusBtn } from './ToggleInterviewStatusBtn'

import type { FeedbackFormValue, FeedbackData } from '../model/types'
import { feedbackActionSchema } from '../model/schema'
import { useAddFeedbackMutation } from '../hooks/use-add-feedback-mutation'

type Props = {
    request_id: UuId
    position_id: UuId
    interview_id: UuId
}
export function FeedbackAction({ interview_id, position_id, request_id }: Props) {
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)

    const { mutate, isPending } = useAddFeedbackMutation({ request_id, position_id, interview_id })

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FeedbackFormValue>({
        resolver: yupResolver<FeedbackFormValue>(feedbackActionSchema),
    })
    const onSubmit: SubmitHandler<FeedbackData> = (data) => {
        mutate(data, {
            onSuccess: () => {
                setOpenApprove(false)
                setOpenReject(false)
                reset()
            },
        })
    }

    return (
        <>
            <ToggleInterviewStatusBtn
                title="Reject the interview stage"
                btnTrigger={
                    <Button variant="destructive" disabled={isPending}>
                        <X />
                        Reject
                    </Button>
                }
                onOpenChange={setOpenReject}
                open={openReject}
                formId="reject-form"
                onSubmit={handleSubmit((data) => onSubmit({ ...data, verdict: 'Rejected', interview_id }))}
                errors={errors}
                register={register}
                btnOkText="Reject"
                isPending={isPending}
            />
            <ToggleInterviewStatusBtn
                title="Approve the interview stage"
                btnTrigger={
                    <Button variant="default" disabled={isPending}>
                        <Check />
                        Approve
                    </Button>
                }
                onOpenChange={setOpenApprove}
                open={openApprove}
                formId="approve-form"
                onSubmit={handleSubmit((data) => onSubmit({ ...data, verdict: 'Approved', interview_id }))}
                errors={errors}
                register={register}
                btnOkText="Approve"
                isPending={isPending}
            />
        </>
    )
}
