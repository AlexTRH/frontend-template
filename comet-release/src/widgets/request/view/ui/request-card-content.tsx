import type { Control } from 'react-hook-form'
import type { FormEventHandler } from 'react'
import {
    ColumnGroup,
    InputControlled,
    LabeledColumn,
    TextareaControlled,
    TitledContainer,
} from '@shared/ui/form-fields'
import { CardContent } from '@shared/ui/card'
import type { Currency } from '@shared/constants/currency'
import type { EditedRequestFormValue } from '@entities/request'
import {
    SelectChannelControlled,
    SelectCurrencyControlled,
    SelectCustomerControlled,
    SelectDepartmentControlled,
    SelectGradeControlled,
    SelectIntermediaryControlled,
    SelectLanguageControlled,
    SelectLocationControlled,
} from '@entities/catalogs'

import { RequestSkipReason } from './request-skip-reason'

type Props = {
    formId: string
    isEditMode: boolean
    control: Control<EditedRequestFormValue>
    rate?: number
    rate_currency?: Currency
    onSubmit?: FormEventHandler<HTMLFormElement>
    skip_reason: string | null
}

export function RequestCardContent({ control, formId, isEditMode, rate, rate_currency, onSubmit, skip_reason }: Props) {
    return (
        <CardContent>
            <RequestSkipReason skip_reason={skip_reason} />
            <form className="flex flex-col gap-6" onSubmit={onSubmit} id={formId}>
                <TitledContainer title="Customer / Intermediary">
                    <ColumnGroup>
                        <LabeledColumn id="customer_id" label="Customer">
                            <SelectCustomerControlled name="customer_id" control={control} disabled={!isEditMode} />
                        </LabeledColumn>
                        <LabeledColumn id="intermediary_id" label="Intermediary">
                            <SelectIntermediaryControlled
                                name="intermediary_id"
                                control={control}
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                    </ColumnGroup>
                </TitledContainer>

                <TitledContainer title="Project details">
                    <ColumnGroup>
                        <LabeledColumn id="project_name" label="Project name" required={isEditMode}>
                            <InputControlled
                                control={control}
                                name="project_name"
                                placeholder="Enter project name"
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                        <LabeledColumn id="domain" label="Domain" required={isEditMode}>
                            <InputControlled
                                control={control}
                                name="domain"
                                placeholder="Enter the domain"
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                    </ColumnGroup>
                    <ColumnGroup>
                        <LabeledColumn id="expected_duration" label="Expected duration, months" required={isEditMode}>
                            <InputControlled
                                control={control}
                                name="expected_duration"
                                placeholder="Enter the expected duration (in months)"
                                disabled={!isEditMode}
                                min={1}
                                type="number"
                            />
                        </LabeledColumn>
                        <LabeledColumn id="developers_count" label="Developers count">
                            <InputControlled
                                control={control}
                                name="developers_count"
                                placeholder="Enter count"
                                min={1}
                                disabled={!isEditMode}
                                type="number"
                            />
                        </LabeledColumn>
                        <LabeledColumn id="language" label="Language" required={isEditMode}>
                            <SelectLanguageControlled name="language" control={control} disabled={!isEditMode} />
                        </LabeledColumn>
                    </ColumnGroup>
                    <ColumnGroup gridCol="grid-cols-4">
                        {rate && (
                            <LabeledColumn id="rate" label="Rate" required={isEditMode}>
                                <InputControlled
                                    control={control}
                                    name="rate"
                                    placeholder="Enter the rate"
                                    disabled={!isEditMode}
                                    type="number"
                                />
                            </LabeledColumn>
                        )}
                        {rate_currency && (
                            <LabeledColumn id="rate_currency" label="Currency" required={isEditMode}>
                                <SelectCurrencyControlled
                                    name="rate_currency"
                                    control={control}
                                    disabled={!isEditMode}
                                />
                            </LabeledColumn>
                        )}
                        {/*<LabeledColumn id="desired_people" label="Desired people" columnClass="col-span-2">
                            <SelectCandidatesControlled
                                name="desired_people"
                                control={control}
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>*/}
                    </ColumnGroup>
                </TitledContainer>

                <TitledContainer title="Requirements">
                    <ColumnGroup gridCol="grid-cols-1">
                        <LabeledColumn id="job_requirements" label="Job requirements">
                            <TextareaControlled
                                name="job_requirements"
                                control={control}
                                placeholder="Describe the job requirements"
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                    </ColumnGroup>
                    <ColumnGroup>
                        <LabeledColumn id="grade" label="Grade" required={isEditMode}>
                            <SelectGradeControlled name="grade" control={control} disabled={!isEditMode} />
                        </LabeledColumn>
                        <LabeledColumn id="location_id" label="Location">
                            <SelectLocationControlled name="location_id" control={control} disabled={!isEditMode} />
                        </LabeledColumn>
                    </ColumnGroup>
                </TitledContainer>

                <TitledContainer title="Additional information">
                    <ColumnGroup>
                        <LabeledColumn
                            id="is_internal_acquisition_channel"
                            label="Acquisition channel"
                            required={isEditMode}
                        >
                            <SelectChannelControlled
                                name="is_internal_acquisition_channel"
                                control={control}
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                        <LabeledColumn id="department" label="Department" required={isEditMode}>
                            <SelectDepartmentControlled name="department" control={control} disabled={!isEditMode} />
                        </LabeledColumn>
                    </ColumnGroup>
                    <ColumnGroup gridCol="grid-cols-1">
                        <LabeledColumn id="description" label="Description">
                            <TextareaControlled
                                name="description"
                                control={control}
                                placeholder="Enter a job description"
                                disabled={!isEditMode}
                            />
                        </LabeledColumn>
                    </ColumnGroup>
                </TitledContainer>
            </form>
        </CardContent>
    )
}
