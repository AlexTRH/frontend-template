import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Card } from '@shared/ui/card'
import { getDirtyValues } from '@shared/lib/form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { RequestFormData, EditedRequestFormValue, Request } from '@entities/request'
import { RequestStatus, editRequestSchema } from '@entities/request'

import { RequestCardContent, RequestCardFooter, RequestCardHeader } from './ui'
import { useEditRequestMutation } from './hooks'

type Props = {
    request: Request
}

export function RequestCard({ request }: Props) {
    const [isEditMode, setEditMode] = useState(false)
    const { mutate, isPending } = useEditRequestMutation(request.uuid)

    const formId: string = 'edit-request-form'

    const {
        location: location_id,
        customer: customer_id,
        intermediary: intermediary_id,
        description,
        job_requirements,
        developers_count,
        //desired_people,
        ...restRequestProps
    } = request

    const defaultValues = {
        customer_id,
        intermediary_id,
        location_id,
        description: description || '',
        job_requirements: job_requirements || '',
        developers_count: developers_count || undefined,
        //desired_people: desired_people?.map((candidate) => ({ uuid: candidate, title: candidate })),
        ...restRequestProps,
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { dirtyFields, isDirty },
    } = useForm<EditedRequestFormValue>({
        resolver: yupResolver<EditedRequestFormValue>(editRequestSchema),
        values: defaultValues,
    })

    const onSubmit: SubmitHandler<EditedRequestFormValue> = (data) => {
        const dataDTO: RequestFormData = {
            ...data,
            customer_id: data.customer_id?.uuid || null,
            intermediary_id: data.intermediary_id?.uuid || null,
            location_id: data.location_id.uuid,
            //desired_people: data.desired_people?.map(({ title }) => title),
        }
        mutate(getDirtyValues(dirtyFields, dataDTO), {
            onSuccess: () => {
                setEditMode(false)
            },
        })
    }

    const onCancelClick = () => {
        setEditMode(false)
        reset(defaultValues)
    }

    return (
        <Card className="container">
            <RequestCardHeader
                request_uuid={request.uuid}
                status={request.status}
                project_name={request.project_name}
                is_successful={request.is_successful}
                google_chat_link={request.google_chat_link}
            />
            <RequestCardContent
                control={control}
                isEditMode={isEditMode}
                formId={formId}
                rate={request.rate}
                rate_currency={request.rate_currency}
                skip_reason={request.skip_reason}
                onSubmit={handleSubmit(onSubmit)}
            />
            {request.status !== RequestStatus.CLOSED && (
                <RequestCardFooter
                    request_uuid={request.uuid}
                    formId={formId}
                    isSaveBtnDisabled={isPending || !isDirty}
                    isEditMode={isEditMode}
                    setEditMode={setEditMode}
                    onCancelClick={onCancelClick}
                />
            )}
        </Card>
    )
}
