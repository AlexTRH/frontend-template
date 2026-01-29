import { Controller, type FieldValues } from 'react-hook-form'
import type { ControlledFieldProps, WithDisabled } from '@shared/types'
import { SelectDuration } from '@entities/interview/stage'

export function SelectDurationControlled<T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & WithDisabled) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <SelectDuration {...field} {...rest} />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}
