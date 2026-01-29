import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import type { ReactNode, Ref } from 'react'
import { useState } from 'react'
import { Edit, History, Save, Trash, X } from 'lucide-react'
import type { MenuOption } from '@shared/ui/menu/card-menu'
import { CardMenu } from '@shared/ui/menu'
import {
    ColumnGroup,
    DateTimeControlled,
    InputControlled,
    LabeledColumn,
    SelectDurationControlled,
    TextareaControlled,
} from '@shared/ui/form-fields'
import { Card, CardContent, CardFooter } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import { ConfirmationWindowTrigger } from '@shared/ui'
import type { UuId } from '@shared/types'
import { getDirtyValues } from '@shared/lib/form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SelectInterviewType } from './select-interview-type'

import type {
    CreatedInterviewData,
    CreatedInterviewFormValue,
    InterviewStage,
    InterviewStageMode,
} from '../model/types'
import { createdInterviewStageSchema } from '../model/schema'
import {
    useCreateInterviewStageMutation,
    useDeleteInterviewStageMutation,
    useEditInterviewStageMutation,
} from '../hooks'
import { InterviewStatusConfig } from '../config'

type Props = {
    interview_stage?: InterviewStage
    position_id: UuId
    request_id: UuId
    candidate_email: string
    initialMode: InterviewStageMode
    closeStage?: () => void
    actionsSlot?: ReactNode
    ref?: Ref<HTMLFormElement>
    renderLogs?: (isLogsOpen: boolean, setLogsOpen: (v: boolean) => void) => ReactNode
}
export function InterviewStageCard({
    interview_stage,
    position_id,
    request_id,
    candidate_email,
    initialMode,
    closeStage,
    actionsSlot,
    ref,
    renderLogs,
}: Props) {
    const [mode, setMode] = useState(initialMode)
    const [isLogsOpen, setLogsOpen] = useState(false)

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false)

    const options: MenuOption[] = interview_stage
        ? [
              { title: 'Edit', icon: <Edit />, onClick: () => setMode('edit') },
              { title: 'Delete', icon: <Trash />, onClick: () => setDeleteConfirmationOpen(true) },
              { title: 'Activity', icon: <History />, onClick: () => setLogsOpen(true) },
          ]
        : []

    const { mutateWhenCreate, isPendingWhenCreate } = useCreateInterviewStageMutation({ request_id, position_id })
    const { mutateWhenEdit, isPendingWhenEdit } = useEditInterviewStageMutation({ request_id, position_id })
    const { mutateWhenDelete, isPendingWhenDelete } = useDeleteInterviewStageMutation({ request_id, position_id })

    const isPending = isPendingWhenEdit || isPendingWhenCreate || isPendingWhenDelete
    const isEditableMode = mode === 'edit' || mode === 'create'
    const isDisabledField = isPending || !isEditableMode

    const cardClassName = isEditableMode
        ? 'bg-secondary shadow-primary shadow-md'
        : interview_stage
          ? InterviewStatusConfig[interview_stage.status].color
          : ''

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, dirtyFields, isDirty },
    } = useForm<CreatedInterviewFormValue>({
        defaultValues: mode === 'create' ? { duration: 60 } : interview_stage,
        resolver: yupResolver<CreatedInterviewFormValue>(createdInterviewStageSchema),
    })

    const onSubmit: SubmitHandler<CreatedInterviewFormValue> = (data) => {
        const dataDTO: CreatedInterviewData = {
            ...data,
            candidate_email,
            request_positions_id: position_id,
        }

        if (mode === 'create') {
            mutateWhenCreate(dataDTO, {
                onSuccess: () => closeStage && closeStage(),
            })
            return
        }
        if (mode === 'edit') {
            const modifiedField = getDirtyValues(dirtyFields, dataDTO)
            mutateWhenEdit(
                { interview_id: interview_stage!.uuid, body: modifiedField },
                {
                    onSuccess: () => {
                        reset({ ...interview_stage, ...modifiedField })
                        setMode('view')
                    },
                }
            )
            return
        }
    }

    const handleCancelClick = () => {
        if (mode === 'create' && closeStage) {
            closeStage()
            return
        }
        if (mode === 'edit') {
            reset(interview_stage)
            setMode('view')
        }
    }

    const handleConfirm = () => {
        if (interview_stage?.uuid) {
            mutateWhenDelete(interview_stage.uuid, {
                onSettled: () => {
                    setDeleteConfirmationOpen(false)
                },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="interview-stage-form" ref={ref}>
            <ConfirmationWindowTrigger
                open={deleteConfirmationOpen}
                onOpenChange={setDeleteConfirmationOpen}
                handleConfirm={handleConfirm}
                question={
                    <>
                        Are you absolutely sure you want to delete
                        <span className="text-secondary-foreground"> {interview_stage?.stage_name} </span>interview
                        stage?
                    </>
                }
                description="This action cannot be undone"
                isPending={isPending}
            />
            {renderLogs && renderLogs(isLogsOpen, setLogsOpen)}
            <Card className={cardClassName}>
                <CardContent>
                    {interview_stage && (
                        <div className="flex justify-between items-start">
                            <Badge variant={InterviewStatusConfig[interview_stage.status].badgeVariant} animate="pulse">
                                {InterviewStatusConfig[interview_stage.status].en}
                            </Badge>
                            <CardMenu options={options} disabled={initialMode === 'disabled' || isPending} />
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <ColumnGroup>
                            <LabeledColumn id="stage_name" label="Stage name" required={isEditableMode}>
                                <InputControlled
                                    control={control}
                                    name="stage_name"
                                    placeholder="Enter a name of interview stage"
                                    disabled={isDisabledField}
                                />
                            </LabeledColumn>
                        </ColumnGroup>
                        <ColumnGroup>
                            <LabeledColumn id="types" label="Type" required={isEditableMode}>
                                <Controller
                                    name="types"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectInterviewType
                                            onChange={field.onChange}
                                            value={field.value}
                                            disabled={isDisabledField}
                                        />
                                    )}
                                />
                                <p className="field-error">{errors.types?.message}</p>
                            </LabeledColumn>
                            <LabeledColumn id="meeting_link" label="Meeting link">
                                <InputControlled
                                    control={control}
                                    name="meeting_link"
                                    placeholder="Attach a link to meet"
                                    disabled={isDisabledField}
                                />
                            </LabeledColumn>
                        </ColumnGroup>
                        <ColumnGroup>
                            <LabeledColumn id="start_datetime" label="Date and time" required={isEditableMode}>
                                <DateTimeControlled
                                    control={control}
                                    name="start_datetime"
                                    disabled={isDisabledField}
                                />
                            </LabeledColumn>
                            <LabeledColumn id="duration" label="Duration" required={isEditableMode}>
                                <SelectDurationControlled
                                    control={control}
                                    name="duration"
                                    disabled={isDisabledField}
                                />
                            </LabeledColumn>
                        </ColumnGroup>
                        <LabeledColumn id="description" label="Description" required={isEditableMode}>
                            <TextareaControlled
                                name="description"
                                control={control}
                                placeholder="Enter a description"
                                disabled={isDisabledField}
                                className="h-[100px]"
                            />
                        </LabeledColumn>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4 justify-end">
                    {isEditableMode && (
                        <>
                            <Button variant="destructive" onClick={handleCancelClick} disabled={isPending}>
                                <X />
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending || !isDirty}>
                                <Save />
                                Save
                            </Button>
                        </>
                    )}
                    {mode === 'view' && actionsSlot}
                </CardFooter>
            </Card>
        </form>
    )
}
