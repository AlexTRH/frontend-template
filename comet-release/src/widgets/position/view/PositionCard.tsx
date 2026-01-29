import { type SubmitHandler, useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Edit, History } from 'lucide-react'
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardMenu,
    CardTitle,
    ColumnGroup,
    Input,
    InputControlled,
    LabeledColumn,
    TitledContainer,
} from '@shared/ui'
import type { MenuOption } from '@shared/ui'
import { extractFullNameFromEmail } from '@shared/lib/email'
import { noDataValue } from '@shared/constants/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ClosePositionButton } from '@features/position'
import type { Position } from '@entities/position'
import { checkIfPositionDisabled, PositionStatusConfig } from '@entities/position'
import { GradeConfig } from '@entities/catalogs/grade'
import { DepartmentConfig } from '@entities/catalogs/department'

import type { EditedPositionFormValue } from './model'
import { editedPositionStageSchema } from './model'
import { useEditPositionMutation } from './hooks'

type Props = {
    data: Position
    renderLogs: (isLogsOpen: boolean, setLogsOpen: (v: boolean) => void) => ReactNode
}

export function PositionCard({ data, renderLogs }: Props) {
    const [editMode, setEditMode] = useState(false)
    const [isLogsOpen, setLogsOpen] = useState(false)
    const { status, candidate_email, project_name, grade, department, request_uuid, uuid, cv_link } = data
    const { mutate, isPending } = useEditPositionMutation({ request_uuid, uuid })
    const isClosable = !(checkIfPositionDisabled(data) || editMode)
    const fullName = extractFullNameFromEmail(candidate_email)

    const {
        reset,
        control,
        handleSubmit,
        setFocus,
        formState: { isDirty },
    } = useForm<EditedPositionFormValue>({
        defaultValues: { cv_link: cv_link || '' },
        resolver: yupResolver<EditedPositionFormValue>(editedPositionStageSchema),
    })

    const switchEditMode = () => {
        setEditMode((prev) => !prev)
        setFocus('cv_link')
    }

    const cancelEdit = () => {
        switchEditMode()
        reset({ cv_link: cv_link || '' })
    }
    const onSubmit: SubmitHandler<EditedPositionFormValue> = (data) => {
        mutate(data, {
            onSuccess: switchEditMode,
        })
    }

    const options: MenuOption[] = [
        { title: 'Edit CV link', icon: <Edit />, onClick: switchEditMode },
        { title: 'Activity', icon: <History />, onClick: () => setLogsOpen(true) },
    ]

    return (
        <Card className="container">
            {renderLogs(isLogsOpen, setLogsOpen)}
            <CardHeader className="flex justify-between">
                <CardTitle className="text-3xl">
                    {fullName}
                    <Badge
                        variant={PositionStatusConfig[status].badgeVariant}
                        className="relative -top-3 -right-2"
                        animate="pulse"
                    >
                        {PositionStatusConfig[status].en}
                    </Badge>
                </CardTitle>
                <CardMenu options={options} disabled={!isClosable} />
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} id="position-form">
                    <TitledContainer title="Project">
                        <ColumnGroup>
                            <LabeledColumn id="project_name" label="Project name">
                                <Input disabled id="project_name" value={project_name || noDataValue} />
                            </LabeledColumn>
                        </ColumnGroup>
                    </TitledContainer>

                    <TitledContainer title="Candidate">
                        <ColumnGroup>
                            <LabeledColumn id="candidate_name" label="Name">
                                <Input disabled id="candidate_name" value={fullName || noDataValue} />
                            </LabeledColumn>
                            <LabeledColumn id="candidate_email" label="Email">
                                <Input disabled id="candidate_email" value={candidate_email || noDataValue} />
                            </LabeledColumn>
                        </ColumnGroup>
                        <ColumnGroup>
                            <LabeledColumn id="cv_link" label="CV link" required={editMode}>
                                <InputControlled name="cv_link" control={control} disabled={!editMode || isPending} />
                            </LabeledColumn>
                            <LabeledColumn id="grade" label="Grade">
                                <Input disabled id="grade" value={GradeConfig[grade] || noDataValue} />
                            </LabeledColumn>
                        </ColumnGroup>
                        <ColumnGroup>
                            <LabeledColumn id="department" label="Department">
                                <Input disabled id="department" value={DepartmentConfig[department] || noDataValue} />
                            </LabeledColumn>
                            <LabeledColumn id="status" label="Status">
                                <Input disabled id="status" value={PositionStatusConfig[status].en || noDataValue} />
                            </LabeledColumn>
                        </ColumnGroup>
                    </TitledContainer>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                {isClosable && <ClosePositionButton request_positions_id={uuid} request_uuid={request_uuid} />}
                {editMode && (
                    <>
                        <Button variant="destructive" onClick={cancelEdit} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" form="position-form" disabled={isPending || !isDirty}>
                            Save
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    )
}
