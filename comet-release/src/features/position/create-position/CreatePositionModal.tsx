import { type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { ModalWindowTrigger } from '@shared/ui/modal'
import { LabeledColumn, RadioGroupControlled } from '@shared/ui/form-fields'
import type { buttonVariants } from '@shared/ui/button'
import type { UuId } from '@shared/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectLanguageControlled } from '@entities/catalogs/language'
import { SelectCandidatesControlled } from '@entities/catalogs/candidates'

import type { CreatedPositionData, CreatedPositionFormValue } from './model'
import { createPositionSchema } from './model'
import { useCreatePositionMutation } from './hooks'

const options = [
    {
        value: 'true',
        label: 'Create a request position and use a default CV.',
    },
    {
        value: 'false',
        label: 'Create CV and send to builders chat.',
    },
]

type Props = {
    request_id: UuId
    btnTriggerVariant?: VariantProps<typeof buttonVariants>
}
export function CreatePositionModal({ request_id, btnTriggerVariant }: Props) {
    const formId = 'create-position'
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useCreatePositionMutation()
    const { control, handleSubmit, reset } = useForm<CreatedPositionFormValue>({
        resolver: yupResolver<CreatedPositionFormValue>(createPositionSchema),
        defaultValues: { is_default: 'true' },
    })

    const onSubmit: SubmitHandler<CreatedPositionFormValue> = (data) => {
        const dataDTO: CreatedPositionData = {
            request_id,
            language: data.language,
            is_default: data.is_default === 'true',
            candidates: data.candidates.map((candidate) => candidate.title),
        }
        mutate(dataDTO, {
            onSuccess: () => {
                reset()
                setOpen(false)
            },
        })
    }

    return (
        <ModalWindowTrigger
            open={open}
            onOpenChange={setOpen}
            btnTriggerContent="Create request position"
            btnTriggerVariant={btnTriggerVariant}
            title="Create request position"
            description="* - required fields"
            isPending={isPending}
            interactOutside={false}
            formId={formId}
            autofocus={false}
        >
            <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)} id={formId}>
                <LabeledColumn label="Candidates" id="candidates" required>
                    <SelectCandidatesControlled name="candidates" control={control} disabled={isPending} />
                </LabeledColumn>
                <LabeledColumn label="Language" id="language" required>
                    <SelectLanguageControlled name="language" control={control} disabled={isPending} />
                </LabeledColumn>
                <LabeledColumn label="CV" id="is_default">
                    <RadioGroupControlled name="is_default" control={control} disabled={isPending} options={options} />
                </LabeledColumn>
            </form>
        </ModalWindowTrigger>
    )
}
