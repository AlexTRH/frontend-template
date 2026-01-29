import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ModalWindowTrigger } from '@shared/ui/modal'
import { InputControlled, LabeledRow, TextareaControlled } from '@shared/ui/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import type { RequestFormData, CreatedRequestFormValue } from '@entities/request'
import { createRequestSchema } from '@entities/request'
import {
    SelectLocationControlled,
    SelectIntermediaryControlled,
    SelectGradeControlled,
    SelectDepartmentControlled,
    SelectCurrencyControlled,
    SelectCustomerControlled,
    SelectChannelControlled,
    SelectLanguageControlled,
} from '@entities/catalogs'

import { useCreateRequestMutation } from './hooks'

export function CreateRequestModal() {
    const [openModal, setOpenModal] = useState(false)

    const formId: string = 'modal-form'

    const { control, handleSubmit, reset } = useForm<CreatedRequestFormValue>({
        resolver: yupResolver<CreatedRequestFormValue>(createRequestSchema),
        defaultValues: {
            customer_id: null,
            intermediary_id: null,
            //desired_people: [],
        },
    })
    const { mutate, isPending } = useCreateRequestMutation()

    const onSubmit: SubmitHandler<CreatedRequestFormValue> = (data) => {
        const dataDTO: RequestFormData = {
            ...data,
            customer_id: data.customer_id?.uuid,
            intermediary_id: data.intermediary_id?.uuid,
            location_id: data.location_id.uuid,
            //desired_people: data.desired_people?.length ? data.desired_people.map(({ title }) => title) : null,
        }
        mutate(dataDTO, {
            onSuccess: () => {
                reset()
                setOpenModal(false)
            },
        })
    }

    return (
        <ModalWindowTrigger
            open={openModal}
            onOpenChange={setOpenModal}
            btnTriggerContent="Create a new request"
            title="Create request"
            description="* - required fields"
            isPending={isPending}
            interactOutside={false}
            formId={formId}
            scrollable
        >
            <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)} id={formId}>
                <LabeledRow id="project_name" label="Project name" required>
                    <InputControlled
                        control={control}
                        name="project_name"
                        placeholder="Enter project name"
                        disabled={isPending}
                    />
                </LabeledRow>
                <LabeledRow id="customer_id" label="Customer">
                    <SelectCustomerControlled name="customer_id" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="intermediary_id" label="Intermediary">
                    <SelectIntermediaryControlled name="intermediary_id" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="domain" label="Domain" required>
                    <InputControlled
                        control={control}
                        name="domain"
                        placeholder="Enter the domain"
                        disabled={isPending}
                    />
                </LabeledRow>
                <LabeledRow id="rate" label="Rate" required childrenClass="col-span-3 grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <InputControlled
                            control={control}
                            name="rate"
                            placeholder="Enter the rate"
                            disabled={isPending}
                            type="number"
                        />
                    </div>
                    <div className="col-span-1">
                        <SelectCurrencyControlled name="rate_currency" control={control} disabled={isPending} />
                    </div>
                </LabeledRow>
                <LabeledRow id="language" label="Language" required>
                    <SelectLanguageControlled name="language" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="expected_duration" label="Duration, months" required>
                    <InputControlled
                        control={control}
                        name="expected_duration"
                        placeholder="Enter the expected duration (in months)"
                        min={1}
                        disabled={isPending}
                        type="number"
                    />
                </LabeledRow>
                <LabeledRow id="location" label="Location" required>
                    <SelectLocationControlled name="location_id" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="job_requirements" label="Job requirements">
                    <TextareaControlled
                        name="job_requirements"
                        control={control}
                        placeholder="Describe the job requirements"
                        disabled={isPending}
                    />
                </LabeledRow>
                <LabeledRow id="grade" label="Grade" required>
                    <SelectGradeControlled name="grade" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="department" label="Department" required>
                    <SelectDepartmentControlled name="department" control={control} disabled={isPending} />
                </LabeledRow>
                <LabeledRow id="developers_count" label="Developers count">
                    <InputControlled
                        control={control}
                        name="developers_count"
                        placeholder="Enter count"
                        min={1}
                        disabled={isPending}
                        type="number"
                    />
                </LabeledRow>
                <LabeledRow id="is_internal_acquisition_channel" label="Channel" required>
                    <SelectChannelControlled
                        name="is_internal_acquisition_channel"
                        control={control}
                        disabled={isPending}
                    />
                </LabeledRow>
                {/*<LabeledRow id="desired_people" label="Desired people">
                    <SelectCandidatesControlled name="desired_people" control={control} disabled={isPending} />
                </LabeledRow>*/}
                <LabeledRow id="description" label="Description">
                    <TextareaControlled
                        name="description"
                        control={control}
                        placeholder="Enter a job description"
                        disabled={isPending}
                    />
                </LabeledRow>
            </form>
        </ModalWindowTrigger>
    )
}
